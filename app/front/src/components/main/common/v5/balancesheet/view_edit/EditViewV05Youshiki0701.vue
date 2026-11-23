<script setup lang="ts">
import { computed, ref, toRaw, watch, type ComputedRef, type Ref } from 'vue';
import { BalancesheetIncomeV05BaseEntity, type BalancesheetIncomeV05BaseEntityInterface } from '../../../../entity/balancesheetIncomeV05BaseEntity.ts';
import { AllSheet0707DonateDto, Row070711DonateDto, ShuushiDocV5KifukinKoujoConstants, ShuushiDocV5YoushikiEdaIncomeConstants, ShuushiDocV5YoushikiKbnConstants, type AllSheet0707DonateDtoInterface, type Row070711DonateDtoInterface } from 'seijishikin-jp-normalize';
import RoutePathConstants from '../../../../../../routePathConstants.ts';
import { useRouter } from 'vue-router';
import KingakuView from '../../../kingaku/KingakuView.vue';

//props,emit
const props = defineProps<{ entity: BalancesheetIncomeV05BaseEntityInterface, index: number }>();
const emits = defineEmits(["sendCancelShuushiEdit", "sendSaveShuushiEdit"]);

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

const editEntity: Ref<BalancesheetIncomeV05BaseEntityInterface> = ref(new BalancesheetIncomeV05BaseEntity());
watch(
    () => props.entity,
    (newEntity) => {
        if (newEntity) {
            editEntity.value = structuredClone(toRaw(newEntity));
            editEntity.value.itemName = "寄付";
        }
    },
    { immediate: true, deep: true }
);

function recieveKingaku(kingaku: number) {
    editEntity.value.kingaku = kingaku;
}

function onCancel() {
    emits('sendCancelShuushiEdit');
}

function onSave() {
    emits('sendSaveShuushiEdit', editEntity.value, props.index);
}


const router = useRouter();
function onPreview() {

    const viewDto: Ref<AllSheet0707DonateDtoInterface> = ref(new AllSheet0707DonateDto());
    viewDto.value.allSheetKbn070701Dto.sheet070701DonatePersonDto.pageTotal = editEntity.value.kingaku;
    viewDto.value.allSheetKbn070701Dto.sheet070701DonatePersonDto.sonotaTotal = "0";
    const dto: Row070711DonateDtoInterface = new Row070711DonateDto();
    dto.ichirenNo = 1;
    dto.kifusha = kifusha.value;
    dto.kingaku = editEntity.value.kingaku;
    dto.accrualDate = editEntity.value.accrualDateValueString; // 正式出力時は和暦
    dto.jusho = editEntity.value.kanrenshaAddress;
    dto.shokugyou = editEntity.value.kanrenshaShokugyou;
    dto.bikou = editEntity.value.bikou;
    dto.tohshibangou = editEntity.value.tohshibangou;
    dto.flgZeigakuKohjo = editEntity.value.flgZeigakuKohjo;
    viewDto.value.allSheetKbn070701Dto.sheet070701DonatePersonDto.list.push(dto);

    const objectString: string = JSON.stringify(viewDto.value);
    const resolved = router.resolve({
        path: RoutePathConstants.PAGE_SHUUSHI_V05_0701,
        query: {
            tab: 'posts',
            data: objectString
        },
    });
    window.open(resolved.href, '_blank', 'noopener,noreferrer');
}


const kifusha: ComputedRef<string> = computed(() => editEntity.value.kanrenshaName + "(" + editEntity.value.kanrenshaCode + ")");
</script>
<template>
    <h3>政治資金収支報告書編集 {{ ShuushiDocV5YoushikiKbnConstants.DONATE_TEXT }} {{
        ShuushiDocV5YoushikiEdaIncomeConstants.PERSON_TEXT }}</h3><br>

    <div class="one-line">
        <div class="left-area">
            日付
        </div>
        <div class="right-area">
            {{ editEntity.accrualDateValueString }}
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            項目名
        </div>
        <div class="right-area">
            {{ editEntity.itemName }}
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            寄付者の氏名
        </div>
        <div class="right-area">
            {{ kifusha }}
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            金額
        </div>
        <div class="right-area">
            <KingakuView :kingaku="editEntity.kingaku" :index="0" @send-kingaku="recieveKingaku"></KingakuView>
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            住所
        </div>
        <div class="right-area">
            {{ editEntity.kanrenshaAddress }}
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            職業
        </div>
        <div class="right-area">
            {{ editEntity.kanrenshaShokugyou }}
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            備考
        </div>
        <div class="right-area">
            <input type="text" v-model="editEntity.bikou">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            通し番号
        </div>
        <div class="right-area">
            <input type="number" v-model="editEntity.tohshibangou">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            寄付金税額控除
        </div>
        <div class="right-area">
            <select v-model="editEntity.flgZeigakuKohjo">
                <option :value="ShuushiDocV5KifukinKoujoConstants.NO_SET">{{
                    ShuushiDocV5KifukinKoujoConstants.NO_SET_TEXT }}</option>
                <option :value="ShuushiDocV5KifukinKoujoConstants.ZEIGAKU_KOUJO">{{
                    ShuushiDocV5KifukinKoujoConstants.ZEIGAKU_KOUJO_TEXT }}</option>
            </select>
        </div>
    </div>


    <div class="footer">
        <button class="footer-button" @click="onPreview">紙形式でプレビュー</button>
        <button class="footer-button left-space" @click="onCancel">キャンセル</button>
        <button class="footer-button left-space" @click="onSave">送信</button>
    </div>

</template>
<style scoped></style>
