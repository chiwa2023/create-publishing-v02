<script setup lang="ts">
import { ShuushiDocV5YoushikiEdaIncomeConstants, ShuushiDocV5YoushikiKbnConstants } from 'seijishikin-jp-normalize';
import { SelectOptionNumberDto, type SelectOptionNumberDtoInterface } from 'seijishikin-jp-normalize_common-tool';
import { computed, onMounted, ref, watch, type ComputedRef, type Ref } from 'vue';

//props,emit
const props = defineProps<{ youshikiKbn: number, youshikiKbnEda: number, index: number }>();
const emits = defineEmits(["sendYoushikiKbnInterface"]);

// よく使う定数
// const BLANK: string = "";
const INIT_NUMBER: number = 0;
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

const youshikiKbn: Ref<number> = ref(INIT_NUMBER);
const youshikiKbnEda: Ref<number> = ref(INIT_NUMBER);
onMounted(() => {
    youshikiKbn.value = props.youshikiKbn;
    youshikiKbnEda.value = props.youshikiKbnEda;
});
watch(props, () => {
    youshikiKbn.value = props.youshikiKbn;
    youshikiKbnEda.value = props.youshikiKbnEda;
});

const listYoushikiKbn: Ref<SelectOptionNumberDtoInterface[]> = ref([]);
const listKbnEda: Ref<SelectOptionNumberDtoInterface[]> = ref([]);

// 未選択
listYoushikiKbn.value.push(createOptionDto(ShuushiDocV5YoushikiEdaIncomeConstants.NO_SET, "未設定"));
// 機関誌の発行その他 
listYoushikiKbn.value.push(createOptionDto(ShuushiDocV5YoushikiKbnConstants.KIKANSHI, ShuushiDocV5YoushikiKbnConstants.KIKANSHI_TEXT));
// 借入金
listYoushikiKbn.value.push(createOptionDto(ShuushiDocV5YoushikiKbnConstants.SHAKUNYUKIN, ShuushiDocV5YoushikiKbnConstants.SHAKUNYUKIN_TEXT));
// 本部または支部からの交付金
listYoushikiKbn.value.push(createOptionDto(ShuushiDocV5YoushikiKbnConstants.KOUFUKIN, ShuushiDocV5YoushikiKbnConstants.KOUFUKIN_TEXT));
// その他の収入
listYoushikiKbn.value.push(createOptionDto(ShuushiDocV5YoushikiKbnConstants.SHUUNYU_SONOTA, ShuushiDocV5YoushikiKbnConstants.SHUUNYU_SONOTA_TEXT));
// 寄付
listYoushikiKbn.value.push(createOptionDto(ShuushiDocV5YoushikiKbnConstants.DONATE, ShuushiDocV5YoushikiKbnConstants.DONATE_TEXT));
// 寄付のうちあっせんによるもの
listYoushikiKbn.value.push(createOptionDto(ShuushiDocV5YoushikiKbnConstants.DONATE_ASSEN, ShuushiDocV5YoushikiKbnConstants.DONATE_ASSEN_TEXT));
// 政党匿名寄付
listYoushikiKbn.value.push(createOptionDto(ShuushiDocV5YoushikiKbnConstants.DONATE_TOKUMEI, ShuushiDocV5YoushikiKbnConstants.DONATE_TOKUMEI_TEXT));
// 特定パーティー
listYoushikiKbn.value.push(createOptionDto(ShuushiDocV5YoushikiKbnConstants.TOKUTEI_PARTY, ShuushiDocV5YoushikiKbnConstants.TOKUTEI_PARTY_TEXT));
// 政治資金パーティー
listYoushikiKbn.value.push(createOptionDto(ShuushiDocV5YoushikiKbnConstants.PARTY, ShuushiDocV5YoushikiKbnConstants.PARTY_TEXT));
// 政治資金パーティーのうちあっせんによるもの
listYoushikiKbn.value.push(createOptionDto(ShuushiDocV5YoushikiKbnConstants.PARTY_ASSEN, ShuushiDocV5YoushikiKbnConstants.PARTY_ASSEN_TEXT));

// 未選択
listKbnEda.value.push(createOptionDto(ShuushiDocV5YoushikiEdaIncomeConstants.NO_SET, ShuushiDocV5YoushikiEdaIncomeConstants.NO_SET_TEXT));
// 枝区分個人 
listKbnEda.value.push(createOptionDto(ShuushiDocV5YoushikiEdaIncomeConstants.PERSON, ShuushiDocV5YoushikiEdaIncomeConstants.PERSON_TEXT));
// 枝区分企業／団体 
listKbnEda.value.push(createOptionDto(ShuushiDocV5YoushikiEdaIncomeConstants.KIGYOU_DT, ShuushiDocV5YoushikiEdaIncomeConstants.KIGYOU_DT_TEXT));
// 枝区分政治団体 
listKbnEda.value.push(createOptionDto(ShuushiDocV5YoushikiEdaIncomeConstants.SEIJI_DANTAI, ShuushiDocV5YoushikiEdaIncomeConstants.SEIJI_DANTAI_TEXT));

function createOptionDto(value: number, text: string): SelectOptionNumberDtoInterface {

    const dto: SelectOptionNumberDtoInterface = new SelectOptionNumberDto();
    dto.value = value;
    dto.text = text;
    return dto;
}


const disableKbnEda: ComputedRef<boolean> = computed(() => {
    // 寄付と政治資金パーティの時のみ収入では様式区分を使用する
    if (ShuushiDocV5YoushikiKbnConstants.DONATE == youshikiKbn.value
        || ShuushiDocV5YoushikiKbnConstants.DONATE_ASSEN == youshikiKbn.value
        || ShuushiDocV5YoushikiKbnConstants.PARTY == youshikiKbn.value
        || ShuushiDocV5YoushikiKbnConstants.PARTY_ASSEN == youshikiKbn.value
    ) {
        return false;
    } else {
        return true;
    }
});

function onYoushikiSelect() {
    emits("sendYoushikiKbnInterface", youshikiKbn.value, youshikiKbnEda.value, props.index);
}
</script>
<template>
    <div class="form-group-vertical">
        <select v-model="youshikiKbn" @change="onYoushikiSelect">
            <option v-for="dto in listYoushikiKbn" :key="dto.value" :value="dto.value"> {{ dto.text }}</option>
        </select>
        <select v-model="youshikiKbnEda" :disabled="disableKbnEda" style="width: 50%;" @change="onYoushikiSelect">
            <option v-for="dto in listKbnEda" :key="dto.value" :value="dto.value"> {{ dto.text }}</option>
        </select>
    </div>

</template>
<style scoped></style>
