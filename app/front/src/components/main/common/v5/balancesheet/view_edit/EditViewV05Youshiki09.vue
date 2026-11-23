<script setup lang="ts">
import { ref, toRaw, watch, type Ref } from 'vue';
import { BalancesheetIncomeV05BaseEntity, type BalancesheetIncomeV05BaseEntityInterface } from '../../../../entity/balancesheetIncomeV05BaseEntity';
import { AllSheet0709AnonymousInPoliticalPartyDto, Row070900AnonymousIPartyDto, ShuushiDocV5YoushikiKbnConstants, type AllSheet0709AnonymousInPoliticalPartyDtoInterface, type Row070900AnonymousIPartyDtoInterface } from 'seijishikin-jp-normalize';
import RoutePathConstants from '../../../../../../routePathConstants';
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
            editEntity.value.itemName = "政党匿名寄附";
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

    const viewDto: Ref<AllSheet0709AnonymousInPoliticalPartyDtoInterface> = ref(new AllSheet0709AnonymousInPoliticalPartyDto());
    viewDto.value.sheet070900AnonymousInPoliticalPartyDto.pageTotal = editEntity.value.kingaku;
    const dto: Row070900AnonymousIPartyDtoInterface = new Row070900AnonymousIPartyDto();
    dto.ichirenNo = 1;
    dto.basho = editEntity.value.kaisaiBasho;
    dto.kingaku = editEntity.value.kingaku;
    dto.accrualDate = editEntity.value.accrualDateValueString; // 正式出力時は和暦
    dto.bikou = editEntity.value.bikou;
    viewDto.value.sheet070900AnonymousInPoliticalPartyDto.list.push(dto);

    const objectString: string = JSON.stringify(viewDto.value);
    const resolved = router.resolve({
        path: RoutePathConstants.PAGE_SHUUSHI_V05_09,
        query: {
            tab: 'posts',
            data: objectString
        },
    });
    window.open(resolved.href, '_blank', 'noopener,noreferrer');

}
</script>
<template>
    <h3>政治資金収支報告書編集 {{ ShuushiDocV5YoushikiKbnConstants.DONATE_TOKUMEI_TEXT }}</h3><br>

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
            匿名寄附を受けた場所
        </div>
        <div class="right-area">
            <input type="text" v-model="editEntity.kaisaiBasho">
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
            備考
        </div>
        <div class="right-area">
            <input type="text" v-model="editEntity.bikou" class="max-input">
        </div>
    </div>

    <div class="footer">
        <button class="footer-button" @click="onPreview">紙形式でプレビュー</button>
        <button class="footer-button left-space" @click="onCancel">キャンセル</button>
        <button class="footer-button left-space" @click="onSave">送信</button>
    </div>

</template>
<style scoped></style>
