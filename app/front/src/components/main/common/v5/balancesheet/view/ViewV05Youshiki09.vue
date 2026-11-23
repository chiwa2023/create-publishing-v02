<script setup lang="ts">
import { AllSheet0709AnonymousInPoliticalPartyDto, ShuushiDocV5YoushikiKbnConstants, type AllSheet0709AnonymousInPoliticalPartyDtoInterface } from 'seijishikin-jp-normalize';
import getKingakuString from '../../../../utils/getKingakuString';
import { onMounted, ref, type Ref } from 'vue';
import RowV05Youshiki09 from '../row/RowV05Youshiki09.vue';
import { useRoute } from 'vue-router';

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

const route = useRoute();
const viewDto: Ref<AllSheet0709AnonymousInPoliticalPartyDtoInterface> = ref(new AllSheet0709AnonymousInPoliticalPartyDto());

// queryを適用
onMounted(() => {
    if (route.query.data) {
        try {
            // 文字列からオブジェクトに復元
            viewDto.value = JSON.parse(route.query.data as string);
        } catch (e) {
            console.error('データのパースに失敗しました', e);
        }
    }
});

</script>
<template>
    <div>
        その9
        <table>
            <tbody>
                <tr>
                    <td>&nbsp;</td>
                    <th colspan="4">(9){{ ShuushiDocV5YoushikiKbnConstants.DONATE_TOKUMEI_TEXT }}</th>
                </tr>
                <tr>
                    <th>行番号</th>
                    <th>匿名寄附を受けた場所</th>
                    <th>金額</th>
                    <th>年月日</th>
                    <th>備考</th>
                </tr>
                <tr v-for="rowDto in viewDto.sheet070900AnonymousInPoliticalPartyDto.list">
                    <RowV05Youshiki09 :row-dto="rowDto"></RowV05Youshiki09>
                    <!--
                    <td>{{ rowDto.ichirenNo }}</td>
                    <td>{{ rowDto.basho }}</td>
                    <td>{{ getKingakuString(rowDto.kingaku) }}</td>
                    <td>{{ rowDto.accrualDate }}</td>
                    <td>{{ rowDto.bikou }}</td>
                     -->
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <th>合計</th>
                    <td>{{ getKingakuString(viewDto.sheet070900AnonymousInPoliticalPartyDto.pageTotal) }}</td>
                    <td colspan="2">&nbsp;</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
@import "../balancesheet_v05.css";
</style>
