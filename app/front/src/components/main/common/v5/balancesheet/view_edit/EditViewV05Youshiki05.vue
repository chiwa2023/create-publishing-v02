<script setup lang="ts">
import { ref, toRaw, watch, type Ref } from 'vue';
import { BalancesheetIncomeV05BaseEntity, type BalancesheetIncomeV05BaseEntityInterface } from '../../../../entity/balancesheetIncomeV05BaseEntity';
import { AllSheet0705IncomeRelatedToGrantsDto, Row070500RelatedToGrantsDto, ShuushiDocV5YoushikiEdaIncomeConstants, ShuushiDocV5YoushikiKbnConstants, type AllSheet0705IncomeRelatedToGrantsDtoInterface, type Row070500RelatedToGrantsDtoInterface } from 'seijishikin-jp-normalize';
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
            editEntity.value.itemName = "政党交付金受け取り";
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

    const viewDto: Ref<AllSheet0705IncomeRelatedToGrantsDtoInterface> = ref(new AllSheet0705IncomeRelatedToGrantsDto());
    viewDto.value.sheet070500IncomeRelatedToGrantsDto.pageTotal = editEntity.value.kingaku;
    const dto: Row070500RelatedToGrantsDtoInterface = new Row070500RelatedToGrantsDto();
    dto.ichirenNo = 1;
    dto.honbuShibuName = editEntity.value.kanrenshaName + " (" + editEntity.value.kanrenshaCode + ")";
    dto.kingaku = editEntity.value.kingaku;
    dto.accrualDate = editEntity.value.accrualDateValueString; // 正式出力時は和暦
    dto.jimushoJuusho = editEntity.value.kanrenshaAddress;
    dto.bikou = editEntity.value.bikou;
    viewDto.value.sheet070500IncomeRelatedToGrantsDto.list.push(dto);

    const objectString: string = JSON.stringify(viewDto.value);
    const resolved = router.resolve({
        path: RoutePathConstants.PAGE_SHUUSHI_V05_05,
        query: {
            tab: 'posts',
            data: objectString
        },
    });
    window.open(resolved.href, '_blank', 'noopener,noreferrer');


}
</script>
<template>
    <h3>政治資金収支報告書編集 {{ ShuushiDocV5YoushikiKbnConstants.KOUFUKIN_TEXT }}</h3><br>

    <div class="one-line">
        <div class="left-area">
            交付金を供与した<br>本部または支部
        </div>
        <div class="right-area">
            <div class=" form-group-vertical">
                <div>
                    {{ ShuushiDocV5YoushikiEdaIncomeConstants.getLabel(editEntity.kanrenshaKbn) }}
                </div>
                <div>
                    <span>( {{ editEntity.kanrenshaCode }} )</span>
                    <span class="left-space">{{ editEntity.kanrenshaName }}</span>
                </div>
            </div>
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
            金額
        </div>
        <div class="right-area">
            <KingakuView :kingaku="editEntity.kingaku" :index="0" @send-kingaku="recieveKingaku"></KingakuView>
        </div>
    </div>

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
            事務所の所在地
        </div>
        <div class="right-area">
            {{ editEntity.kanrenshaAddress }}
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
