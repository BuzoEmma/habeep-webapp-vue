<template>
    <div class="flex flex-col gap-y-5 h-full items-center w-full">
        <div class="flex flex-col border border-gray-200 w-full divide-y rounded-lg h-full gap-y-6">
            <div class="top justify-center items-center h-1/2 w-full flex flex-col py-7">
                <p class="text-6xl font-bold text-webapp flex flex-row items-end">0.00 <span class="text-sm">NGN</span></p>
            </div>
            <div class="bottom justify-center items-center h-1/2 w-full flex flex-col py-10">
                <div class="w-full flex flex-row items-center justify-center gap-x-16">
                    <div class="flex flex-col gap-y-1 items-center">
                        <img src="../../../assets/icons/wallet/deposit.svg" alt="">
                        <span class="text-xs text-webapp">Deposit</span>
                    </div>
                    <div class="flex flex-col gap-y-1 items-center">
                        <img src="../../../assets/icons/wallet/withdraw.svg" alt="">
                        <span class="text-xs text-webapp">Withdraw</span>
                    </div>
                    <div class="flex flex-col gap-y-1 items-center">
                        <img src="../../../assets/icons/wallet/swap.svg" alt="">
                        <span class="text-xs text-webapp">Swap</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col w-full rounded-lg border border-gray-200">
            <div class="pb-5 pt-2 flex-auto w-full h-full">
                <span class="text-xl ml-2 font-medium text-webapp">Transactions</span>
                <div class="tab-content tab-space w-full flex flex-col items-center justify-center">
                    <!-- WALLET -->
                    <div class="h-full w-full">
                        <div class="overflow-x-auto txn-body w-full">
                            <table class="w-full table-auto">
                                <thead class="w-full">
                                    <th>Date</th>
                                    <th>Transaction type</th>
                                    <th>Reference</th>
                                    <th>Amount</th>
                                    <th>Transaction status</th>
                                </thead>
                                <br>

                                <tr class="tables w-full px-2 pt-4">
                                    <td class="">Mar 24, 2022</td>
                                    <td class="capitalize">Wallet withdrawal</td>
                                    <td class="">Bank account 1</td>
                                    <td class="">N 1500</td>
                                    <td>
                                        <div class="pl-6 w-32 py-2 rounded-md" style="background: rgb(28,170,67, 0.1)">
                                            <span class="text-sm text-green-500 text-center w-full">Completed</span>
                                        </div>
                                    </td>

                                </tr>
                            </table>
                        </div>


                        <!-- pagination tab -->
                        <div class="w-full flex flex-col items-end mt-20 px-3" v-if="filteredTxns.length < 1">
                            <div class="flex flex-row items-center gap-x-3">
                                <span class="w-full text-webapp text-lg">Page {{ currentPage }} of
                                    {{ Math.round(allPagesTxn) }}</span>
                                <button class="flex flex-row items-center justify-center rounded-lg border-2 p-1"
                                    :class="{ 'text-gray-400 border-gray-400': currentPage === 1, 'border-webapp text-webapp': currentPage > 1 }"
                                    @click="paginateEvent(currentPage - 1, transactions, filteredTxns, currentPage, 'Txn')"
                                    :disabled="currentPage === 1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>

                                <button class="flex flex-row items-center justify-center  rounded-lg border-2 p-1"
                                    :class="{ 'text-gray-400 border-gray-400': currentPage === Math.round(allPagesTxn), 'border-webapp text-webapp': currentPage < Math.round(allPagesTxn) }"
                                    @click="paginateEvent(currentPage + 1, transactions, filteredTxns, currentPage, 'Txn')"
                                    :disabled="currentPage === Math.round(allPagesTxn)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>


                    </div>
                    <div class="flex flex-col items-center justify-center  gap-y-1 py-20">
                        <img src="../../../assets/icons/no-txn.svg" alt="">
                        <span class="text-sm text-sub-webapp">No transaction</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

import { useStore } from "vuex";
import axios from '../../../composables/axios'

import moment from 'moment';
const store = useStore();

const transactions = ref([])
const waitForWalletLoad = ref(true)

// pagination
let currentPage = ref(1);
let allPagesTxn = ref(1)
let filteredTxns = ref([])

function paginateTxns(array, newArray, pageType) {
    let perPage = array.length >= 10 ? 10 : array.length
    let from = (pageType * perPage) - perPage;
    let to = (pageType * perPage);
    if (array.length < 10) {
        newArray.value = []
        array.forEach(txn => {
            newArray.value.push(txn)
        })
    } else {
        let reference = array
        newArray.value = []
        reference.slice(from, to).forEach(txn => {
            if (newArray.value.length < 11) {
                newArray.value.push(txn)
            }
        })
    }
}

function paginateEvent(page, arrayToFilter, newArray, pageType, pgstr) {
    let perPage = arrayToFilter.length >= 10 ? 10 : arrayToFilter.length
    if (pgstr === 'Txn') {
        currentPage.value = page
        allPagesTxn.value = arrayToFilter.length / perPage
        if (newArray.value === undefined) {
            paginateTxns(arrayToFilter, filteredTxns, pageType)
        } else paginateTxns(arrayToFilter, newArray, pageType)
    }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
}

.main::-webkit-scrollbar {
    width: 6px;
}


.main::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: #71759D;
    border-radius: 10px;
}

.main::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
}

td {

    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    vertical-align: middle;

    color: #0A1045;
    font-weight: 300;
    font-size: 15px;
}

thead {
    background: #FFFFFF;
    box-shadow: 0px -0.33px 0px #D9DDEE, 0px 0.33px 0px #D9DDEE;
    height: 56px;
}



th {
    text-align: left;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 400;
    font-size: 15px;
    color: #0A1045;
    line-height: 25px;
}
</style>