<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { type BalancesheetIncomeV05BaseEntityInterface } from '../../../../entity/balancesheetIncomeV05BaseEntity';
import EditViewV05Youshiki03 from './EditViewV05Youshiki03.vue';
import { ShuushiDocV5YoushikiEdaIncomeConstants, ShuushiDocV5YoushikiKbnConstants } from 'seijishikin-jp-normalize';
import EditViewV05Youshiki04 from './EditViewV05Youshiki04.vue';
import EditViewV05Youshiki10 from './EditViewV05Youshiki10.vue';
import EditViewV05Youshiki09 from './EditViewV05Youshiki09.vue';
import EditViewV05Youshiki06 from './EditViewV05Youshiki06.vue';
import EditViewV05Youshiki05 from './EditViewV05Youshiki05.vue';
import EditViewV05Youshiki0702 from './EditViewV05Youshiki0702.vue';
import EditViewV05Youshiki0703 from './EditViewV05Youshiki0703.vue';
import EditViewV05Youshiki0701 from './EditViewV05Youshiki0701.vue';
import EditViewV05Youshiki0801 from './EditViewV05Youshiki0801.vue';
import EditViewV05Youshiki0802 from './EditViewV05Youshiki0802.vue';
import EditViewV05Youshiki0803 from './EditViewV05Youshiki0803.vue';
import EditViewV05Youshiki1101 from './EditViewV05Youshiki1101.vue';
import EditViewV05Youshiki1102 from './EditViewV05Youshiki1102.vue';
import EditViewV05Youshiki1103 from './EditViewV05Youshiki1103.vue';
import EditViewV05Youshiki1201 from './EditViewV05Youshiki1201.vue';
import EditViewV05Youshiki1202 from './EditViewV05Youshiki1202.vue';
import EditViewV05Youshiki1203 from './EditViewV05Youshiki1203.vue';

// props, emit
const props = defineProps<{ entity: BalancesheetIncomeV05BaseEntityInterface, index: number }>();
const emits = defineEmits(["sendCancelShuushiEdit", "sendSaveShuushiEdit"]);

// 様式表示制御
const isShowYoushiki03: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.KIKANSHI === props.entity.youshikiKbn
);
const isShowYoushiki04: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.SHAKUNYUKIN === props.entity.youshikiKbn
);
const isShowYoushiki05: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.KOUFUKIN === props.entity.youshikiKbn
);
const isShowYoushiki06: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.SHUUNYU_SONOTA === props.entity.youshikiKbn
);
const isShowYoushiki0701: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.DONATE === props.entity.youshikiKbn
        && ShuushiDocV5YoushikiEdaIncomeConstants.PERSON === props.entity.youshikiEdaKbn
);
const isShowYoushiki0702: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.DONATE === props.entity.youshikiKbn
        && ShuushiDocV5YoushikiEdaIncomeConstants.KIGYOU_DT === props.entity.youshikiEdaKbn
);
const isShowYoushiki0703: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.DONATE === props.entity.youshikiKbn
        && ShuushiDocV5YoushikiEdaIncomeConstants.SEIJI_DANTAI === props.entity.youshikiEdaKbn
);
const isShowYoushiki0801: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.DONATE_ASSEN === props.entity.youshikiKbn
        && ShuushiDocV5YoushikiEdaIncomeConstants.PERSON === props.entity.youshikiEdaKbn
);
const isShowYoushiki0802: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.DONATE_ASSEN === props.entity.youshikiKbn
        && ShuushiDocV5YoushikiEdaIncomeConstants.KIGYOU_DT === props.entity.youshikiEdaKbn
);
const isShowYoushiki0803: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.DONATE_ASSEN === props.entity.youshikiKbn
        && ShuushiDocV5YoushikiEdaIncomeConstants.SEIJI_DANTAI === props.entity.youshikiEdaKbn
);
const isShowYoushiki09: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.DONATE_TOKUMEI === props.entity.youshikiKbn
);
const isShowYoushiki10: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.TOKUTEI_PARTY === props.entity.youshikiKbn
);
const isShowYoushiki1101: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.PARTY === props.entity.youshikiKbn
        && ShuushiDocV5YoushikiEdaIncomeConstants.PERSON === props.entity.youshikiEdaKbn
);
const isShowYoushiki1102: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.PARTY === props.entity.youshikiKbn
        && ShuushiDocV5YoushikiEdaIncomeConstants.KIGYOU_DT === props.entity.youshikiEdaKbn
);
const isShowYoushiki1103: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.PARTY === props.entity.youshikiKbn
        && ShuushiDocV5YoushikiEdaIncomeConstants.SEIJI_DANTAI === props.entity.youshikiEdaKbn
);
const isShowYoushiki1201: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.PARTY_ASSEN === props.entity.youshikiKbn
        && ShuushiDocV5YoushikiEdaIncomeConstants.PERSON === props.entity.youshikiEdaKbn
);
const isShowYoushiki1202: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.PARTY_ASSEN === props.entity.youshikiKbn
        && ShuushiDocV5YoushikiEdaIncomeConstants.KIGYOU_DT === props.entity.youshikiEdaKbn
);
const isShowYoushiki1203: ComputedRef<boolean> = computed(
    () => ShuushiDocV5YoushikiKbnConstants.PARTY_ASSEN === props.entity.youshikiKbn
        && ShuushiDocV5YoushikiEdaIncomeConstants.SEIJI_DANTAI === props.entity.youshikiEdaKbn
);

function recieveSave(savedEntity: BalancesheetIncomeV05BaseEntityInterface, index: number) {
    emits("sendSaveShuushiEdit", savedEntity, index);
}

function recieveCancel() {
    emits("sendCancelShuushiEdit");
}

</script>
<template>

    <!-- 収支報告書様式3編集 -->
    <EditViewV05Youshiki03 v-if="isShowYoushiki03" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki03>

    <!-- 収支報告書様式 4編集 -->
    <EditViewV05Youshiki04 v-if="isShowYoushiki04" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki04>

    <!-- 収支報告書様式 5編集 -->
    <EditViewV05Youshiki05 v-if="isShowYoushiki05" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki05>

    <!-- 収支報告書様式 6編集 -->
    <EditViewV05Youshiki06 v-if="isShowYoushiki06" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki06>

    <!-- 収支報告書様式 7編集 -->
    <EditViewV05Youshiki0701 v-if="isShowYoushiki0701" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki0701>
    <EditViewV05Youshiki0702 v-if="isShowYoushiki0702" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki0702>
    <EditViewV05Youshiki0703 v-if="isShowYoushiki0703" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki0703>

    <!-- 収支報告書様式 8編集 -->
    <EditViewV05Youshiki0801 v-if="isShowYoushiki0801" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki0801>
    <EditViewV05Youshiki0802 v-if="isShowYoushiki0802" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki0802>
    <EditViewV05Youshiki0803 v-if="isShowYoushiki0803" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki0803>

    <!-- 収支報告書様式 9編集 -->
    <EditViewV05Youshiki09 v-if="isShowYoushiki09" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki09>

    <!-- 収支報告書様式10編集 -->
    <EditViewV05Youshiki10 v-if="isShowYoushiki10" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki10>

    <!-- 収支報告書様式11編集 -->
    <EditViewV05Youshiki1101 v-if="isShowYoushiki1101" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki1101>
    <EditViewV05Youshiki1102 v-if="isShowYoushiki1102" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki1102>
    <EditViewV05Youshiki1103 v-if="isShowYoushiki1103" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki1103>

    <!-- 収支報告書様式12編集 -->
    <EditViewV05Youshiki1201 v-if="isShowYoushiki1201" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki1201>
    <EditViewV05Youshiki1202 v-if="isShowYoushiki1202" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki1202>
    <EditViewV05Youshiki1203 v-if="isShowYoushiki1203" @send-cancel-shuushi-edit="recieveCancel"
        @send-save-shuushi-edit="recieveSave" :index="props.index" :entity="props.entity">
    </EditViewV05Youshiki1203>

</template>
<style scoped></style>
