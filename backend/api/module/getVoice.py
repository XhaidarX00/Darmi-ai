import urllib.parse
from curl_cffi import requests
from pydub import AudioSegment
import os

# Fungsi untuk membuat URL Google TTS
def generate_tts_url(text, language='id-ID', speed=1):
    base_url = 'https://translate.google.com/translate_tts'
    params = {
        'ie': 'UTF-8',
        'tl': language,
        'client': 'tw-ob',
        'q': text,
        'ttsspeed': speed
    }
    url = base_url + '?' + urllib.parse.urlencode(params)
    return url


# Fungsi untuk split kalimat menjadi bagian yang lebih kecil dari 200 karakter
def split_text(text, max_length=200):
    words = text.split()  # Membagi teks berdasarkan kata
    parts = []
    current_part = ""

    for word in words:
        # Periksa apakah menambahkan kata baru akan melebihi batas panjang
        if len(current_part) + len(word) + 1 <= max_length:
            # Tambahkan kata ke bagian saat ini dengan spasi
            current_part += (word + " ")
        else:
            # Jika melebihi batas, simpan bagian yang ada
            parts.append(current_part.strip())
            # Mulai bagian baru dengan kata saat ini
            current_part = word + " "

    # Simpan bagian terakhir jika ada
    if current_part:
        parts.append(current_part.strip())

    return parts


# Fungsi untuk melakukan request TTS dan menyimpan audionya
def get_audio_from_text(text_parts, path_audio, language='id-ID', speed=1):
    audio_segments = []
    temp_files = []
    
    for index, part in enumerate(text_parts):
        tts_url = generate_tts_url(part, language, speed)
        # print(tts_url)
        response = requests.get(tts_url, impersonate="chrome120")
        if response.status_code == 200:
            # return response.text
            # print(response.content)
            # temp_files.append(response.content)
            # Simpan audio sementara ke file sementara
            # temp_audio_path = f'temp_part_{index}.mp3'
            temp_audio_path = os.path.join(path_audio, 'temp_audio.mp3')
            with open(temp_audio_path, 'wb') as audio_file:
                audio_file.write(response.content)
            
            return temp_audio_path
            # # Tambahkan audio ke list sebagai AudioSegment
            # audio_segments.append(AudioSegment.from_mp3(temp_audio_path))
            # temp_files.append(temp_audio_path)  # Simpan path file untuk penghapusan nanti
            # print(f"Audio berhasil disimpan di: {temp_audio_path}")
        else:
            print(f"Gagal mendapatkan audio untuk bagian {index + 1}")
        
    
    # return audio_segments, temp_files
    # return temp_files
    return

# Fungsi untuk menggabungkan audio dan menghapus file sementara
def merge_audios(audio_segments, temp_files, output_path="voice.mp3"):
    try:
        combined_audio = AudioSegment.empty()
        
        for segment in audio_segments:
            combined_audio += segment
        
        combined_audio.export(output_path, format="mp3")
        print(f"Audio final berhasil disimpan di: {output_path}")
    except Exception as e:
        print(f"Error saat menggabungkan audio: {e}")
        return None
    
     # Menghapus file audio sementara setelah selesai
    for temp_file in temp_files:
        if os.path.exists(temp_file):
            try:
                os.remove(temp_file)
                print(f"File sementara {temp_file} berhasil dihapus.")
            except OSError as e:
                print(f"Error menghapus file {temp_file}: {e}")
        else:
            print(f"File {temp_file} tidak ditemukan, dilewatkan.")
    
    return output_path


def getVoice(prompt, path_audio):
    text_parts = split_text(prompt, max_length=200)
    # audio_segments, temp_files = get_audio_from_text(text_parts)
    # output_path = merge_audios(audio_segments, temp_files, output_path="voice.mp3")
    output_path = get_audio_from_text(text_parts, path_audio)
    if output_path:
        return output_path
    else:
        return None


# prompt = 'apa kabar kamu hari ini?'
# path = getVoice(prompt)
# os.system(f"start {path}")

# # Contoh penggunaan
# kalimat = """Dalam tatap mata yang sederhana,
# tersimpan lautan, mendalam dan nyata,
# cinta terlahir, tanpa kata,
# bersemi di hati, bagaikan embun pagi.

# Setiap sentuhan lembut, penuh makna,
# mengukir kisah di antara kita,
# bukan hanya janji, tapi rasa,
# yang tumbuh dan abadi, selamanya.
# """
    
# # Step 1: Split kalimat menjadi beberapa bagian
# text_parts = split_text(kalimat, max_length=200)
# print(text_parts)

# # Step 2: Mendapatkan audio untuk setiap bagian
# audio_segments, temp_files = get_audio_from_text(text_parts)

# # Step 3: Menggabungkan audio menjadi satu dan menghapus file sementara
# merge_audios(audio_segments, temp_files, output_path="final_audio.mp3")