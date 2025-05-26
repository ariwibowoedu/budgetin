import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { db } from '@/components/includes/firebase'
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from 'firebase/firestore'

export const useTransactionStore = defineStore('transaction', () => {
    const transactions = ref([])

    // get data from firestore
    const fetchTransactions = async () => {
        const snapshot = await getDocs(collection(db, 'transactions'))
        transactions.value = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    }

    // add data
    const addTransaction = async (transaction) => {
        const docRef = await addDoc(collection(db, 'transactions'), transaction)
        transactions.value.push({ id: docRef.id, ...transaction })
    }

    // delete data
    const deleteTransaction = async (id) => {
        await deleteDoc(doc(db, 'transactions', id))
        transactions.value = transactions.value.filter(t => t.id !== id)
    }

    // getters
    const totalIncome = computed(() =>
        transactions.value
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0)
    )

    const totalExpense = computed(() =>
        transactions.value
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0)
    )

    const balance = computed(() => totalIncome.value - totalExpense.value)

    return {
        transactions, fetchTransactions, addTransaction, deleteTransaction, totalExpense, totalIncome, balance
    }
})