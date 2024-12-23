<template>
  <div>
    <div
      class="flex flex-col gap-y-5 h-full items-center w-full"
      v-if="walletData !== null"
    >
      <div
        class="flex flex-col border border-gray-200 w-full divide-y rounded-lg h-fit gap-y-6"
      >
        <div
          class="top justify-center items-center h-1/2 w-full flex flex-col py-7"
        >
          <p class="text-6xl font-bold text-webapp flex flex-row items-end">
            {{ formatNumber(walletData.accountValue) }}
            <span class="text-sm">HBP</span>
          </p>
        </div>
        <div
          class="bottom justify-center items-center h-1/2 w-full flex flex-col py-10"
        >
          <div
            class="w-full flex flex-row items-center justify-center gap-x-16"
          >
            <div
              class="flex flex-col gap-y-1 items-center cursor-pointer"
              @click="$emit('openModal', 'depositHBPModal')"
            >
              <img src="../../../assets/icons/wallet/deposit.svg" alt="" />
              <span class="text-xs text-webapp">Deposit</span>
            </div>
            <div
              class="flex flex-col gap-y-1 items-center cursor-pointer"
              @click="$emit('openModal', 'chooseHBPWithdrawalMethodModal')"
            >
              <img src="../../../assets/icons/wallet/withdraw.svg" alt="" />
              <span class="text-xs text-webapp">Withdraw</span>
            </div>
            <div class="flex flex-col gap-y-1 items-center cursor-pointer">
              <img src="../../../assets/icons/wallet/staking.svg" alt="" />
              <span class="text-xs text-webapp">Staking</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col w-full rounded-lg border border-gray-200">
        <div class="pb-5 pt-2 flex-auto w-full h-full">
          <span class="text-xl ml-2 font-medium text-webapp">Transactions</span>
          <div
            class="tab-content tab-space w-full flex flex-col items-center justify-center"
          >
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
                  <br />

                  <tr
                    class="tables w-full px-2 pt-4"
                    v-for="txn in transactions"
                    :key="txn"
                  >
                    <td class="">{{ txn.date + " @ " + txn.time }}</td>
                    <td class="capitalize">Wallet {{ txn.txnType }}</td>
                    <td class="">{{ txn.reference }}</td>
                    <td class="amount">{{ txn.amount.toFixed(2) }} HBP</td>
                    <td>
                      <div
                        class="w-32 py-2 rounded-md text-center"
                        style="background: rgb(28, 170, 67, 0.1)"
                      >
                        <span
                          class="text-sm text-green-500 text-center w-full"
                          v-if="txn.status === 'COMPLETED'"
                          >COMPLETED</span
                        >
                        <span
                          class="text-sm text-blue-500 text-center w-full"
                          v-if="txn.status === 'PENDING'"
                          >PENDING</span
                        >
                        <span
                          class="text-sm text-red-500 text-center w-full"
                          v-if="txn.status === 'FAILED'"
                          >FAILED</span
                        >
                      </div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- pagination tab -->
              <div
                class="w-full flex flex-col items-end mt-20 px-3"
                v-if="transactions.length > 1"
              >
                <div class="flex flex-row items-center gap-x-3">
                  <span class="w-full text-webapp text-lg"
                    >Page {{ currentPage }} of
                    {{ Math.round(allPagesTxn) }}</span
                  >
                  <button
                    class="flex flex-row items-center justify-center rounded-lg border-2 p-1"
                    :class="{
                      'text-gray-400 border-gray-400': currentPage === 1,
                      'border-webapp text-webapp': currentPage > 1,
                    }"
                    @click="
                      paginateEvent(
                        currentPage - 1,
                        transactions,
                        filteredTxns,
                        currentPage,
                        'Txn'
                      )
                    "
                    :disabled="currentPage === 1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>

                  <button
                    class="flex flex-row items-center justify-center rounded-lg border-2 p-1"
                    :class="{
                      'text-gray-400 border-gray-400':
                        currentPage === Math.round(allPagesTxn),
                      'border-webapp text-webapp':
                        currentPage < Math.round(allPagesTxn),
                    }"
                    @click="
                      paginateEvent(
                        currentPage + 1,
                        transactions,
                        filteredTxns,
                        currentPage,
                        'Txn'
                      )
                    "
                    :disabled="currentPage === Math.round(allPagesTxn)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div
              class="flex flex-col items-center justify-center gap-y-1 py-20"
              v-if="transactions.length < 1"
            >
              <img src="../../../assets/icons/no-txn.svg" alt="" />
              <span class="text-sm text-sub-webapp">No transaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center w-full mt-24" v-else>
      <loader
        :letters="['H', 'A', 'B', 'E', 'E', 'P']"
        size="200px"
        color="#0A1045"
      ></loader>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

import { useStore } from "vuex";
import axios from "../../../composables/axios";
import { useRoute, useRouter } from "vue-router";
import formatNumber from "number_formatter";

import moment from "moment";
const store = useStore();

const route = useRoute();
const router = useRouter();
const emit = defineEmits(["openModal", "sendWallet"]);

const transactions = ref([]);
const waitForWalletLoad = ref(true);
const walletData = ref({
  accountValue: 0,
});

// pagination
let currentPage = ref(1);
let allPagesTxn = ref(1);
let filteredTxns = ref([]);

if (route.query.cont) {
  if (route.query.cont === "deposit") {
    emit("openModal", "depositHBPModal");
  }
  if (route.query.cont === "withdraw") {
    emit("openModal", "chooseHBPWithdrawalMethodModal");
  }
  router.replace({ query: null });
}

function paginateTxns(array, newArray, pageType) {
  let perPage = array.length >= 10 ? 10 : array.length;
  let from = pageType * perPage - perPage;
  let to = pageType * perPage;

  let sortedArray = array.sort((a, c) => {
    return c.createdAt - a.createdAt;
  });

  if (sortedArray.length < 11) {
    newArray.value = [];
    newArray.value = sortedArray;
  } else {
    newArray.value = [];
    const filtered = sortedArray.slice(from, to);
    newArray.value = filtered;
  }
}

function paginateEvent(page, arrayToFilter, newArray, pageType, pgstr) {
  let perPage = arrayToFilter.length >= 10 ? 10 : arrayToFilter.length;
  if (pgstr === "Txn") {
    currentPage.value = page;
    allPagesTxn.value = arrayToFilter.length / perPage;
    if (newArray.value === undefined) {
      paginateTxns(arrayToFilter, filteredTxns, pageType);
    } else paginateTxns(arrayToFilter, newArray, pageType);
  }
}

async function getWallet() {
  try {
    const hbpWallet = await axios.post("/wallet/fetch-wallet", {
      wallet: "hbp",
    });
    if (hbpWallet.data.error === false) {
      walletData.value = hbpWallet.data.data;

      emit("sendWallet", walletData.value);

      getTransactions(hbpWallet.data.data.recentActivities);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getTransactions(txns) {
  try {
    for (const txn of txns) {
      const fetch = await axios.post("/wallet/fetch-transaction", { id: txn });
      if (fetch.data.error === false) {
        transactions.value.push(fetch.data.data);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

getWallet();
</script>

<style scoped>
table {
  border-collapse: collapse;
  table-layout: auto;
}

.main::-webkit-scrollbar {
  width: 6px;
}

.main::-webkit-scrollbar-thumb {
  width: 5px;
  background-color: #71759d;
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
  word-wrap: normal;
  white-space: nowrap;

  color: #0a1045;
  font-weight: 300;
  font-size: 15px;
}

td.amount {
  font-weight: 500 !important;
}

thead {
  background: #ffffff;
  box-shadow: 0px -0.33px 0px #d9ddee, 0px 0.33px 0px #d9ddee;
  height: 56px;
}

th {
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: 400;
  font-size: 15px;
  color: #0a1045;
  word-wrap: normal;
  white-space: nowrap;
  line-height: 25px;
}
</style>
