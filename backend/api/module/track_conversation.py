class ConversationTracker:
    def __init__(self, max_history=10):
        """
        Inisialisasi tracker percakapan dengan batas maksimum riwayat percakapan.
        :param max_history: Jumlah maksimum pasangan pertanyaan-jawaban yang disimpan.
        """
        self.history = []  # Array untuk menyimpan riwayat percakapan
        self.max_history = max_history  # Batas maksimum riwayat percakapan

    def add_conversation(self, user_input: str, ai_response: str):
        """
        Menambahkan pasangan pertanyaan-jawaban ke riwayat percakapan.
        :param user_input: Pertanyaan atau input dari pengguna.
        :param ai_response: Respons dari AI.
        """
        # Tambahkan pasangan ke riwayat
        self.history.append({"question": user_input, "answer": ai_response})
        # Jika jumlah percakapan melebihi batas, hapus yang paling lama
        if len(self.history) > self.max_history:
            self.history.pop(0)

    def get_history(self):
        """
        Mengambil seluruh riwayat percakapan.
        :return: List dari pasangan pertanyaan-jawaban.
        """
        return self.history

    def clear_history(self):
        """
        Menghapus seluruh riwayat percakapan.
        """
        self.history = []
