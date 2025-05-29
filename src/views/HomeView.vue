<template>
  <div class="p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Budgetin.</h1>
      <!-- persentase -->
      <div class="grid grid-cols-1 gap-4 mb-4">
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-lg font-semibold text-red-600">Persentase Pengeluaran</h2>
          <div class="overflow-hidden h-4 mb-4 text-xs flex rounded bg-red-200 mt-4">
            <div
              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600"
              :style="{ width: budgetPercent + '%' }"
            >
              <span class="px-1">{{ budgetPercent }}%</span>
            </div>
          </div>
          <p class="text-sm text-gray-700">
            {{ budgetPercent }}% dari budget Rp. {{ formatCurrency(monthlyBudget) }}
          </p>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-lg font-semibold text-blue-600">Target Tabungan 1 tahun</h2>
          <div class="overflow-hidden h-4 mb-4 text-xs flex rounded bg-blue-200 mt-4">
            <div
              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
              :style="{ width: targetSaving + '%' }"
            >
              <span class="px-1">{{ targetSaving }}%</span>
            </div>
          </div>
          <p class="text-sm text-gray-700">
            {{ targetSaving }}% dari target Rp. {{ formatCurrency(targetSaving1Year) }}
          </p>
        </div>
      </div>
      <!-- Summary Section -->
      <div class="flex flex-col xl:flex-row gap-4 mb-8">
        <!-- Grand Total: 1/3 -->
        <div class="xl:w-1/3 w-full bg-white rounded-xl shadow-md p-6">
          <h2 class="text-lg font-semibold text-yellow-600">Grand Total</h2>
          <p class="text-3xl font-extrabold mt-2 text-yellow-600">
            Rp {{ formatCurrency(totalKeuangan) }}
          </p>
        </div>

        <!-- Other 3 Cards: 2/3 -->
        <div class="xl:w-2/3 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- Tabungan -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-lg font-semibold text-blue-600">Tabungan</h2>
            <p class="text-xl font-bold mt-2 text-blue-600">Rp {{ formatCurrency(saving) }}</p>
          </div>

          <!-- Pemasukan -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-lg font-semibold text-green-600">Pemasukan</h2>
            <p class="text-xl font-bold mt-2 text-green-600">
              Rp {{ formatCurrency(totalIncome) }}
            </p>
          </div>

          <!-- Pengeluaran -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-lg font-semibold text-red-600">Pengeluaran</h2>
            <p class="text-xl font-bold mt-2 text-red-600">Rp {{ formatCurrency(totalExpense) }}</p>
          </div>
        </div>
      </div>

      <!-- recent transaction -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-lg font-semibold text-green-600 mb-4">Pemasukan Terbaru</h2>
          <ul v-for="(item, index) in recentIncomes" :key="index" class="space-y-2">
            <li class="flex justify-between text-sm">
              <span>{{ item.description }}</span>
              <span>Rp.{{ formatCurrency(item.amount) }}</span>
            </li>
          </ul>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-lg font-semibold text-red-600 mb-4">Pengeluaran Terbaru</h2>
          <ul v-for="(item, index) in recentExpenses" :key="index" class="space-y-2">
            <li class="flex justify-between text-sm">
              <span>{{ item.description }}</span>
              <span>Rp.{{ formatCurrency(item.amount) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/components/includes/firebase'

const totalIncome = ref(0)
const totalExpense = ref(0)
const monthlyBudget = ref(5000000)
const targetSaving1Year = ref(100000000)
const totalSaving = ref(0)
const recentIncomes = ref([])
const recentExpenses = ref([])

onMounted(async () => {
  const q = query(collection(db, 'transactions'), orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q)

  const allTransactions = []
  // const querySnapshot = await getDocs(collection(db, 'transactions'))
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    allTransactions.push(data)
    if (data.type === 'income') {
      totalIncome.value += data.amount
    } else if (data.type === 'expense') {
      totalExpense.value += data.amount
    } else if (data.type === 'saving') {
      totalSaving.value += data.amount
    }
  })

  recentIncomes.value = allTransactions.filter((tx) => tx.type === 'income').slice(0, 3)
  recentExpenses.value = allTransactions.filter((tx) => tx.type === 'expense').slice(0, 3)
})

const saving = computed(() => totalSaving.value)

const totalKeuangan = computed(() => {
  return totalIncome.value - totalExpense.value + totalSaving.value
})

const budgetPercent = computed(() => {
  const totalUsed = totalExpense.value
  return Math.min(((totalUsed / monthlyBudget.value) * 100).toFixed(0), 100)
})

const targetSaving = computed(() => {
  const totalSaved = totalSaving.value
  return Math.min(((totalSaved / targetSaving1Year.value) * 100).toFixed(0), 100)
})

const formatCurrency = (value) => {
  return value.toLocaleString('id-ID')
}
</script>

<style>
</style>