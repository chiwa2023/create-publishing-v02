<script setup lang="ts">
import type { Row071000SpecificPartyDtoInterface } from 'seijishikin-jp-normalize';
import getKingakuString from '../../../../utils/getKingakuString';

const props = defineProps<{ rowDto: Row071000SpecificPartyDtoInterface }>();

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


</script>
<template>
    <td>{{ props.rowDto.ichirenNo }}</td>
    <td>{{ props.rowDto.partyName }}</td>
    <td>{{ getKingakuString(props.rowDto.kingaku) }}</td>
    <td>{{ props.rowDto.shiharaisu }}</td>
    <td>{{ props.rowDto.accrualDate }}</td>
    <td>{{ props.rowDto.kaisaiBasho }}</td>
    <td>{{ props.rowDto.bikou }}</td>
</template>
<style scoped>
@import "../balancesheet_v05.css";
</style>
