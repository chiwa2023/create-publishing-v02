<script setup lang="ts">
import { computed, ref, toRaw, watch, type ComputedRef, type Ref } from 'vue';
import { BalancesheetIncomeV05BaseEntity, type BalancesheetIncomeV05BaseEntityInterface } from '../../../../entity/balancesheetIncomeV05BaseEntity.ts';
import { AllSheet0711ConsiderationPartyDto, Row070711DonateDto, Sheet071102ConsiderationPartyGroupDto, ShuushiDocV5YoushikiEdaIncomeConstants, ShuushiDocV5YoushikiKbnConstants, type AllSheet0711ConsiderationPartyDtoInterface, type Row070711DonateDtoInterface, type Sheet071102ConsiderationPartyGroupDtoInterface } from 'seijishikin-jp-normalize';
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
            editEntity.value.itemName = "政治資金パーティ対価";
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
    // TODO パーティ(継続事業)を設定
    //editEntity.value.kaisaiBasho
    emits('sendSaveShuushiEdit', editEntity.value, props.index);
}


const router = useRouter();
function onPreview() {
    const viewDto: Ref<AllSheet0711ConsiderationPartyDtoInterface> = ref(new AllSheet0711ConsiderationPartyDto());

    const sheet: Sheet071102ConsiderationPartyGroupDtoInterface = new Sheet071102ConsiderationPartyGroupDto();
    sheet.sortNo = "1";
    sheet.partyName = editEntity.value.kaisaiBasho;
    sheet.pageTotal = editEntity.value.kingaku;

    const dto: Row070711DonateDtoInterface = new Row070711DonateDto();
    dto.ichirenNo = 1;
    dto.kifusha = kifusha.value;
    dto.kingaku = editEntity.value.kingaku;
    dto.accrualDate = editEntity.value.accrualDateValueString; // 正式出力時は和暦
    dto.jusho = editEntity.value.kanrenshaAddress;
    dto.shokugyou = editEntity.value.kanrenshaShokugyou;
    dto.bikou = editEntity.value.bikou;
    dto.tohshibangou = editEntity.value.tohshibangou;
    // dto.flgZeigakuKohjo = 1; パーティに控除はない
    sheet.list.push(dto);

    viewDto.value.allSheetKbn071102Dto.list.push(sheet);

    const objectString: string = JSON.stringify(viewDto.value);
    const resolved = router.resolve({
        path: RoutePathConstants.PAGE_SHUUSHI_V05_1102,
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
    <h3>政治資金収支報告書編集 {{ ShuushiDocV5YoushikiKbnConstants.PARTY_TEXT }} {{
        ShuushiDocV5YoushikiEdaIncomeConstants.KIGYOU_DT_TEXT }}</h3><br>

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
            政治資金パーティ名
        </div>
        <div class="right-area">
            <!-- TODO 継続事業実施次第入れ替え -->
            <input type="text" v-model="editEntity.kaisaiBasho">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            対価の支払団体代表者
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

    <div class="footer">
        <button class="footer-button" @click="onPreview">紙形式でプレビュー</button>
        <button class="footer-button left-space" @click="onCancel">キャンセル</button>
        <button class="footer-button left-space" @click="onSave">送信</button>
    </div>

</template>
<style scoped></style>
