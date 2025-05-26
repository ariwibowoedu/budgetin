<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6">
    <h1 class="text-2xl font-bold">Tambah Transaksi</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4 bg-white p-6 rounded-xl shadow">
      <!-- Jenis Transaksi -->
      <div>
        <label class="block mb-1 font-medium">Jenis</label>
        <select v-model="type" class="w-full border rounded p-2">
          <option value="income">Pemasukan</option>
          <option value="expense">Pengeluaran</option>
        </select>
      </div>

      <!-- Kategori -->
      <div>
        <label class="block mb-1 font-medium">Kategori</label>
        <select v-model="category" class="w-full border rounded p-2">
          <option v-for="cat in filteredCategories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- Jumlah -->
      <div>
        <label class="block mb-1 font-medium">Jumlah (Rp)</label>
        <input
          type="number"
          v-model.number="amount"
          class="w-full border rounded p-2"
          placeholder="Contoh: 50000"
          required
        />
      </div>

      <!-- Tanggal -->
      <div>
        <label class="block mb-1 font-medium">Tanggal</label>
        <input type="date" v-model="date" class="w-full border rounded p-2" required />
      </div>

      <!-- Catatan -->
      <div>
        <label class="block mb-1 font-medium">Catatan (Opsional)</label>
        <textarea
          v-model="note"
          class="w-full border rounded p-2"
          rows="2"
          placeholder="Contoh: Makan siang..."
        ></textarea>
      </div>

      <!-- Submit -->
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Simpan Transaksi
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const type = ref('expense')
const category = ref('')
const amount = ref(null)
const date = ref(new Date().toISOString().substr(0, 10))
const note = ref('')

// Dummy kategori
const categories = {
  income: ['Gaji', 'Komisi', 'Lainnya'],
  expense: ['Makanan & Minuman', 'Shopping', 'Transportasi', 'Investasi', 'Sewa', 'Lainnya'],
}

const filteredCategories = computed(() => categories[type.value])

function handleSubmit() {
  const data = {
    type: type.value,
    category: category.value,
    amount: amount.value,
    date: date.value,
    note: note.value,
  }

  console.log('Transaksi disimpan:', data)

  // nanti kirim ke Firestore, sekarang kita redirect ke dashboard
  router.push('/')
}
</script>
