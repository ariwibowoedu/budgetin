<template>
  <div class="p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Budgetin.</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-lg font-semibold text-green-600">Pemasukan</h2>
          <p class="text-2xl font-bold mt-2">Rp. {{ formatCurrency(totalIncome) }}</p>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-lg font-semibold text-red-600">Pengeluaran</h2>
          <p class="text-2xl font-bold mt-2">Rp. {{ formatCurrency(totalExpense) }}</p>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-lg font-semibold text-blue-600">Progress Budget</h2>
          <div class="overflow-hidden h-4 mb-4 text-xs flex rounded bg-blue-200 mt-4">
            <div
              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
              :style="{ width: budgetPercent + '%' }"
            ></div>
          </div>
          <p class="text-sm text-gray-700">{{ budgetPercent }}% dari budget bulanan.</p>
        </div>
      </div>
    </div>
    <!-- recent transaction -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 mt-4">
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-lg font-semibold text-green-600 mb-4">Pemasukan Terbaru</h2>
        <ul class="space-y-2">
          <li class="flex justify-between text-sm">
            <span>Desc</span>
            <span>Rp.</span>
          </li>
        </ul>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-lg font-semibold text-red-600 mb-4">Pengeluaran Terbaru</h2>
        <ul class="space-y-2">
          <li class="flex justify-between text-sm">
            <span>Desc</span>
            <span>Rp.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/components/includes/firebase'

const totalIncome = ref(0)
const totalExpense = ref(0)
const monthlyBudget = ref(5000000)

// const recentIncomes = ref([])
// const recentExpenses = ref([])

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'transactions'))
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    if (data.type === 'income') {
      totalIncome.value += data.amount
    } else if (data.type === 'expense') {
      totalExpense.value += data.amount
    }
  })
})

const budgetPercent = computed(() => {
  const totalUsed = totalExpense.value
  return Math.min(((totalUsed / monthlyBudget.value) * 100).toFixed(0), 100)
})

const formatCurrency = (value) => {
  return value.toLocaleString('id-ID')
}
</script>

<style>
</style>