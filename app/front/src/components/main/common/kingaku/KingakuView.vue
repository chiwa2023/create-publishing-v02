<script setup lang="ts">
import { computed, onMounted, ref, watch, type ComputedRef, type Ref } from 'vue';

//props,emit
const props = defineProps<{ kingaku: number, index: number }>();
const emits = defineEmits(["sendKingaku"]);


// よく使う定数
// const BLANK: string = "";
// const INIT_NUMBER: number = 0;
// const INIT_BOOLEAN: boolean = false;
// const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ERROR: number = 400;
// const SEARCH_LIMIT: number = 20;
// メッセージ表示定数
// const INQUIRE_FLG: boolean = false;
// const ERR_MESS_ONLY: boolean = true;
// const MESS_PAGE_NAME: string = "フロア郵便番号追加";
// const INIT_CALLER: string = "no branch";
// const infoLevel: Ref<number> = ref(MessageConstants.LEVEL_NONE);
// const messageType: Ref<number> = ref(MessageConstants.VIEW_NONE);
// const caller: Ref<string> = ref(INIT_CALLER);
// const message: Ref<string> = ref(BLANK);

// Paging
// const pageNumber: Ref<number> = ref(INIT_NUMBER);
// const allCount: Ref<number> = ref(INIT_NUMBER);
// const limit: Ref<number> = ref(SEARCH_LIMIT);

const kingaku: Ref<number> = ref(0);

onMounted(() => {
    kingaku.value = props.kingaku;
});

watch(props, () => {
    kingaku.value = props.kingaku;
});


// 日本円（¥12,800）
const jpyFormatter = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
});

const kingakuString: ComputedRef<string> = computed(() => jpyFormatter.format(kingaku.value));

const viewInput: Ref<boolean> = ref(false);
function onForcus() {
    viewInput.value = true;
}
function onForcusOut() {
    viewInput.value = false;
}
function onInput() {
    emits("sendKingaku", kingaku.value, props.index);
}
</script>
<template>
    <input v-if="viewInput" type="number" v-model="kingaku" @input="onInput" @blur="onForcusOut" class="input_align">
    <input v-if="!viewInput" type="text" v-model="kingakuString" @click="onForcus" class="input_align">
</template>
<style scoped>
.input_align {
    text-align: right;
}
</style>
