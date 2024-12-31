from .utilis import *
from .track_conversation import ConversationTracker
BASE_URL = "https://chatwithai.codesearch.workers.dev/?chat="

tracker = ConversationTracker(max_history=10)

def get_answer_gpt(prompt: str) -> str:
    try:
        listConversation = tracker.get_history()
        # logging.info(f"List Conversation: {listConversation}")
        prompt_awal = f"Kamu adalah asisten virtual bernama darmi, berikan jawaban singkat di bawah 200 karakter dan gunakan bahasa gaul bergaya bahasa anak muda indonesia dengan kata aku dan kamu agar lebih terasa nyaman, dari pertanyaan dibawah:"
        if len(listConversation) > 0:
            prompt_awal = f"Kamu adalah asisten virtual bernama darmi, berikan jawaban singkat di bawah 200 karakter dan gunakan bahasa gaul bergaya bahasa anak muda indonesia dengan kata aku dan kamu agar lebih terasa nyaman, dengan menganalisa history percakapan berkut {listConversation} \nlalu beri jawaban dari pertanyaan dibawah:"
        prompt_encode = quote(f'{prompt_awal}\n{prompt}')
        response = requests.get(f"{BASE_URL}{prompt_encode}")
        logging.info(f"Response Status: {response.status_code}")
        if response.status_code == 200:
            try:
                response_json = response.json()
                answer = response_json.get("data", "wah sepertinya limit mu sudah mencapai batas harian nih, hubungi haidar jika ingin tambah")
                tracker.add_conversation(prompt, answer)
                return answer
            except Exception as e:
                logging.error(f"Failed to parse JSON: {e}")
                return "wah sepertinya limit mu sudah mencapai batas harian nih, hubungi haidar jika ingin tambah"
        else:
            logging.error(f"Non-200 status code received: {response.status_code}")
            return f"wah sepertinya limit mu sudah mencapai batas harian nih, hubungi haidar jika ingin tambah"
    except requests.exceptions.RequestException as e:
        logging.error(f"Request failed: {e}")
        return "wah sepertinya limit mu sudah mencapai batas harian nih, hubungi haidar jika ingin tambah"
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return "wah sepertinya limit mu sudah mencapai batas harian nih, hubungi haidar jika ingin tambah"





# if __name__ == "__main__":
    while True:
        prompt = input("Masukkan pertanyaan: ")
        answer = get_answer_gpt(prompt)
        print(answer)
    # result = get_answer_gpt("kapan tirex bertelur?")
    # print(result)

def getAnswer2(prompt):
    coba = 1
    try:
        while coba <= 3:
            content = get_answer_gpt(prompt=prompt)
            if content:
                return content
            else:
                coba += 1
                time.sleep(1)
    except:
        return None