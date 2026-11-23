<script setup lang="ts">
import { onMounted, ref, toRaw, type Ref } from 'vue';
import { BalancesheetIncomeV05BaseEntity, type BalancesheetIncomeV05BaseEntityInterface } from '../../../../entity/balancesheetIncomeV05BaseEntity';
import YoushikiKbnIncomeSelect from '../parts/YoushikiKbnIncomeSelect.vue';
import KingakuView from '../../../kingaku/KingakuView.vue';
import { ShuushiDocV5YoushikiEdaIncomeConstants, ShuushiDocV5YoushikiKbnConstants } from 'seijishikin-jp-normalize';
import { getErrorUniqueIdMessage, MessageConstants, MessageView, PagingControl, SearchKanrenshaKigyouDt, SearchKanrenshaPerson, SearchKanrenshaSeijidantai, type KanrenshaKigyouDtMasterEntityInterface, type KanrenshaPersonMasterEntityInterface, type KanrenshaSeijidantaiMasterEntityInterface } from 'seijishikin-jp-normalize_common-tool';
import { SearchBalancesheetV05Dto, type SearchBalancesheetV05DtoInterface } from '../../../../dto/v05/balancesheet/searchBalancesheetV05Dto.ts';
import EditViewV05AllIncome from '../view_edit/EditViewV05AllIncome.vue';

// よく使う定数
const BLANK: string = "";
const INIT_NUMBER: number = 0;
const INIT_BOOLEAN: boolean = false;
//const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ERROR: number = 400;
const SEARCH_LIMIT: number = 20;
//メッセージ表示定数
// const INQUIRE_FLG: boolean = false;
// const ERR_MESS_ONLY: boolean = true;
const MESS_PAGE_NAME: string = "政治資金収支報告書収入編集";
const INIT_CALLER: string = "no branch";
const infoLevel: Ref<number> = ref(MessageConstants.LEVEL_NONE);
const messageType: Ref<number> = ref(MessageConstants.VIEW_NONE);
const caller: Ref<string> = ref(INIT_CALLER);
const message: Ref<string> = ref(BLANK);

// Paging
const pageNumber: Ref<number> = ref(INIT_NUMBER);
const allCount: Ref<number> = ref(INIT_NUMBER);
const limit: Ref<number> = ref(SEARCH_LIMIT);

// TODO ログインしているユーザから持ってくる
const tableYear: Ref<number> = ref(2027);

const searchLimitDateStart: Ref<string> = ref(BLANK);
const searchLimitDateEnd: Ref<string> = ref(BLANK);

onMounted(() => {
    // 発生年しか編集させない
    searchLimitDateStart.value = tableYear + "-01-01";
    searchLimitDateEnd.value = tableYear + "-12-31";
    searchDto.value.tableYear = tableYear.value;
});

const searchDto: Ref<SearchBalancesheetV05DtoInterface> = ref(new SearchBalancesheetV05Dto());
const searchList: Ref<BalancesheetIncomeV05BaseEntityInterface[]> = ref([]);
function onSearch() {
    // alert(JSON.stringify(searchDto.value));
    const editEntity1: Ref<BalancesheetIncomeV05BaseEntityInterface> = ref(new BalancesheetIncomeV05BaseEntity());
    editEntity1.value.tableYear = tableYear.value;    
    editEntity1.value.youshikiKbn = ShuushiDocV5YoushikiKbnConstants.KIKANSHI;
    editEntity1.value.itemName = "機関誌定期購読料";
    editEntity1.value.kingaku = 50000;
    editEntity1.value.kanrenshaCode = "123-456789";
    editEntity1.value.kanrenshaName = "迂回献金　太郎";
    editEntity1.value.kanrenshaKbn = ShuushiDocV5YoushikiEdaIncomeConstants.PERSON;
    editEntity1.value.kanrenshaAddress = "宮崎県実在市山麓町";
    editEntity1.value.kanrenshaShokugyou = "さすらい人";
    searchList.value.push(editEntity1.value);
    const editEntity2: Ref<BalancesheetIncomeV05BaseEntityInterface> = ref(new BalancesheetIncomeV05BaseEntity());
    editEntity2.value.tableYear = tableYear.value;    
    searchList.value.push(editEntity2.value);
}

// 様式番号検索条件 
const SEARCH_OK: boolean = true;
const isSearchKikanshi: Ref<boolean> = ref(SEARCH_OK);
// 借入金
const isSearchShakunyukin: Ref<boolean> = ref(SEARCH_OK);
// 本部または支部からの交付金
const isSearchKoufukin: Ref<boolean> = ref(SEARCH_OK);
// その他の収入
const isSearchOther: Ref<boolean> = ref(SEARCH_OK);
// 寄付
const isSearchDonate: Ref<boolean> = ref(SEARCH_OK);
// 寄付のうちあっせんによるもの
const isSearchDonateAssen: Ref<boolean> = ref(SEARCH_OK);
// 政党匿名寄付
const isSearchDonateTokumei: Ref<boolean> = ref(SEARCH_OK);
// 特定パーティー
const isSearchTokuteiParty: Ref<boolean> = ref(SEARCH_OK);
// 政治資金パーティー
const isSearchParty: Ref<boolean> = ref(SEARCH_OK);
// 政治資金パーティーのうちあっせんによるもの
const isSearchPartyAssen: Ref<boolean> = ref(SEARCH_OK);

function recieveYoushikiKbnInterface(youshikiKbn: number, youshikiKbnEda: number, index: number) {

    const tmpEntity: undefined | BalancesheetIncomeV05BaseEntityInterface = searchList.value[index];
    if (undefined !== tmpEntity) {
        tmpEntity.youshikiKbn = youshikiKbn;
        if (disableKanrenshaSelect(tmpEntity)) {
            tmpEntity.youshikiEdaKbn = 0;
        }
        else {
            tmpEntity.youshikiEdaKbn = youshikiKbnEda;
            if (tmpEntity.youshikiEdaKbn !== ShuushiDocV5YoushikiEdaIncomeConstants.NO_SET) {
                tmpEntity.kanrenshaKbn = tmpEntity.youshikiEdaKbn;
            }
        }
        tmpEntity.isEditRequire = true;
    } else {
        infoLevel.value = MessageConstants.LEVEL_ERROR;
        messageType.value = MessageConstants.VIEW_OK;
        message.value = getErrorUniqueIdMessage(index);
    }

}

const disableKanrenshaSelect = (tmpEntity: BalancesheetIncomeV05BaseEntityInterface): boolean => {
    return !(ShuushiDocV5YoushikiKbnConstants.DONATE === tmpEntity.youshikiKbn
        || ShuushiDocV5YoushikiKbnConstants.DONATE_ASSEN === tmpEntity.youshikiKbn
        || ShuushiDocV5YoushikiKbnConstants.PARTY === tmpEntity.youshikiKbn
        || ShuushiDocV5YoushikiKbnConstants.PARTY_ASSEN === tmpEntity.youshikiKbn
    )
}

const isSearchKigyouDt: Ref<boolean> = ref(INIT_BOOLEAN);
const isSearchPerson: Ref<boolean> = ref(INIT_BOOLEAN)
const isSearchSeijidantai: Ref<boolean> = ref(INIT_BOOLEAN)


function onKanrenshaSearch(index: number) {
    selectedIndex.value = index;
    const tmpEntity: undefined | BalancesheetIncomeV05BaseEntityInterface = searchList.value[index];
    if (undefined !== tmpEntity) {
        switch (tmpEntity.kanrenshaKbn) {
            case ShuushiDocV5YoushikiEdaIncomeConstants.PERSON:
                isSearchPerson.value = true;
                break;
            case ShuushiDocV5YoushikiEdaIncomeConstants.KIGYOU_DT:
                isSearchKigyouDt.value = true;
                break;
            case ShuushiDocV5YoushikiEdaIncomeConstants.SEIJI_DANTAI:
                isSearchSeijidantai.value = true;
                break;
        }
    } else {
        infoLevel.value = MessageConstants.LEVEL_ERROR;
        messageType.value = MessageConstants.VIEW_OK;
        message.value = getErrorUniqueIdMessage(index);
    }
}

const selectedIndex: Ref<number> = ref(INIT_NUMBER);

function recieveKigyouDtInterface(entity: KanrenshaKigyouDtMasterEntityInterface) {

    const tmpEntity: undefined | BalancesheetIncomeV05BaseEntityInterface = searchList.value[selectedIndex.value];
    if (undefined !== tmpEntity) {
        tmpEntity.kanrenshaId = entity.kanrenshaKigyouDtMasterId;
        tmpEntity.kanrenshaCode = entity.kigyouDtKanrenshaCode;
        tmpEntity.kanrenshaName = entity.kanrenshaName;
        tmpEntity.kanrenshaAddress = entity.allAddress;
        tmpEntity.kanrenshaShokugyou = entity.kigyouDtDelegate;
        tmpEntity.isEditRequire = true;
    } else {
        infoLevel.value = MessageConstants.LEVEL_ERROR;
        messageType.value = MessageConstants.VIEW_OK;
        message.value = getErrorUniqueIdMessage(selectedIndex.value);
    }

    isSearchKigyouDt.value = false;
}

function recievePersonInterface(entity: KanrenshaPersonMasterEntityInterface) {

    const tmpEntity: undefined | BalancesheetIncomeV05BaseEntityInterface = searchList.value[selectedIndex.value];
    if (undefined !== tmpEntity) {
        tmpEntity.kanrenshaId = entity.kanrenshaPersonMasterId;
        tmpEntity.kanrenshaCode = entity.personKanrenshaCode;
        tmpEntity.kanrenshaName = entity.kanrenshaName;
        tmpEntity.kanrenshaAddress = entity.allAddress;
        tmpEntity.kanrenshaShokugyou = entity.personShokugyou;

        tmpEntity.isEditRequire = true;
    } else {
        infoLevel.value = MessageConstants.LEVEL_ERROR;
        messageType.value = MessageConstants.VIEW_OK;
        message.value = getErrorUniqueIdMessage(selectedIndex.value);
    }
    isSearchPerson.value = false;
}

function recieveSeijidantaiInterface(entity: KanrenshaSeijidantaiMasterEntityInterface) {

    const tmpEntity: undefined | BalancesheetIncomeV05BaseEntityInterface = searchList.value[selectedIndex.value];
    if (undefined !== tmpEntity) {
        tmpEntity.kanrenshaId = entity.kanrenshaSeijidantaiMasterId;
        tmpEntity.kanrenshaCode = entity.seijidantaiKanrenshaCode;
        tmpEntity.kanrenshaName = entity.kanrenshaName;
        tmpEntity.kanrenshaAddress = entity.allAddress;
        tmpEntity.kanrenshaShokugyou = entity.seijidantaiDelegate;
        tmpEntity.isEditRequire = true;
    } else {
        infoLevel.value = MessageConstants.LEVEL_ERROR;
        messageType.value = MessageConstants.VIEW_OK;
        message.value = getErrorUniqueIdMessage(selectedIndex.value);
    }


    isSearchSeijidantai.value = false;
}

function recieveCancelPerson() {
    isSearchPerson.value = false;
}
function recieveCancelKigyouDt() {
    isSearchKigyouDt.value = false;
}
function recieveCancelSeijidantai() {
    isSearchSeijidantai.value = false;
}

function onDateChange(index: number) {

    const tmpEntity: undefined | BalancesheetIncomeV05BaseEntityInterface = searchList.value[index];
    if (undefined !== tmpEntity) {
        tmpEntity.isEditRequire = true;
    } else {
        infoLevel.value = MessageConstants.LEVEL_ERROR;
        messageType.value = MessageConstants.VIEW_OK;
        message.value = getErrorUniqueIdMessage(index);
    }
}

function convertRequiredString(isRewuire: boolean): string {
    if (isRewuire) {
        return "＊";
    } else {
        return BLANK;
    }
}

function recieveSubmit() {
    // 非表示
    infoLevel.value = 0;
    messageType.value = 0;
}
function recievePagingNumber(selecteddNumber: number) {
    pageNumber.value = selecteddNumber;
    alert("ページ情報受信");
}




// TODO 仮の行表示は削除する
const showIndex: Ref<number> = ref(INIT_NUMBER)
function onShowEntity() {

    const tmpEntity: undefined | BalancesheetIncomeV05BaseEntityInterface = searchList.value[showIndex.value];
    if (undefined !== tmpEntity) {
        alert(JSON.stringify(tmpEntity));
    } else {
        infoLevel.value = MessageConstants.LEVEL_ERROR;
        messageType.value = MessageConstants.VIEW_OK;
        message.value = getErrorUniqueIdMessage(showIndex.value);
    }
}

function recieveKingaku(kingaku: number, index: number) {
    const tmpEntity: undefined | BalancesheetIncomeV05BaseEntityInterface = searchList.value[index];
    if (undefined !== tmpEntity) {
        tmpEntity.kingaku = kingaku;
    } else {
        infoLevel.value = MessageConstants.LEVEL_ERROR;
        messageType.value = MessageConstants.VIEW_OK;
        message.value = getErrorUniqueIdMessage(index);
    }
}

const isShow: Ref<boolean> = ref(false);
const youshikiEntity: Ref<BalancesheetIncomeV05BaseEntityInterface> = ref(new BalancesheetIncomeV05BaseEntity());
function onEdit(editEntity: BalancesheetIncomeV05BaseEntityInterface, index: number) {

    if (0 === editEntity.youshikiKbn) {
        // TODO 様式区分が設定されていないときは編集コンポーネントを表示しない
        alert("様式区分未指定");
        return;
    }

    youshikiEntity.value = editEntity;
    selectedIndex.value = index;
    isShow.value = true;
}

function recieveSave(savedEntity: BalancesheetIncomeV05BaseEntityInterface, index: number) {
    const tmpEntity: undefined | BalancesheetIncomeV05BaseEntityInterface = searchList.value[index];
    if (undefined !== tmpEntity) {
        searchList.value[index] = structuredClone(toRaw(savedEntity));
    } else {
        infoLevel.value = MessageConstants.LEVEL_ERROR;
        messageType.value = MessageConstants.VIEW_OK;
        message.value = getErrorUniqueIdMessage(index);
    }
    isShow.value = false;
}
function recieveCancel() {
    isShow.value = false;
}

</script>
<template>
    <h1>{{ MESS_PAGE_NAME }}</h1><br>

    <h3>検索条件</h3><br>
    <div class="one-line">
        <div class="left-area">
            発生年
        </div>
        <div class="right-area">
            {{ searchDto.tableYear }}
        </div>
    </div>
    <div class="one-line">
        <div class="left-area">
            日付
        </div>
        <div class="right-area">
            <input type="date" v-model="searchDto.startDate" :min="searchLimitDateStart" :max="searchLimitDateEnd">
            <span class="left-space">から</span> <input v-model="searchDto.endDate" type="date"
                :min="searchLimitDateStart" :max="searchLimitDateEnd" class="left-space"> <span
                class="left-space">まで</span>
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            様式番号
        </div>
        <div class="right-area">
            <div>
                <input type="checkbox" v-model="isSearchKikanshi">{{ ShuushiDocV5YoushikiKbnConstants.KIKANSHI_TEXT }}
                <input type="checkbox" v-model="isSearchShakunyukin" class="left-space">{{
                    ShuushiDocV5YoushikiKbnConstants.SHAKUNYUKIN_TEXT }}
                <input type="checkbox" v-model="isSearchKoufukin" class="left-space">{{
                    ShuushiDocV5YoushikiKbnConstants.KOUFUKIN_TEXT }}
                <input type="checkbox" v-model="isSearchOther" class="left-space">{{
                    ShuushiDocV5YoushikiKbnConstants.SHUUNYU_SONOTA_TEXT
                }}
            </div>
            <div>
                <input type="checkbox" v-model="isSearchDonate">{{ ShuushiDocV5YoushikiKbnConstants.DONATE_TEXT }}
                <input type="checkbox" v-model="isSearchDonateAssen" class="left-space">{{
                    ShuushiDocV5YoushikiKbnConstants.DONATE_ASSEN_TEXT }}
                <input type="checkbox" v-model="isSearchDonateTokumei" class="left-space">{{
                    ShuushiDocV5YoushikiKbnConstants.DONATE_TOKUMEI_TEXT }}
                <input type="checkbox" v-model="isSearchTokuteiParty" class="left-space">{{
                    ShuushiDocV5YoushikiKbnConstants.TOKUTEI_PARTY_TEXT }}
                <input type="checkbox" v-model="isSearchParty" class="left-space">{{
                    ShuushiDocV5YoushikiKbnConstants.PARTY_TEXT }}
                <input type="checkbox" v-model="isSearchPartyAssen">{{
                    ShuushiDocV5YoushikiKbnConstants.PARTY_ASSEN_TEXT }}
            </div>
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            無償提供
        </div>
        <div class="right-area">
            <input type="checkbox">無償提供を含む
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            検索
        </div>
        <div class="right-area">
            <button @click="onSearch">検索</button>
        </div>
    </div>

    <h3>検索結果</h3><br>
    <!-- ページング -->
    <PagingControl :all-count="allCount" :limit="limit" :page-number="pageNumber"
        @send-paging-number="recievePagingNumber"></PagingControl>
    <div class="one-line-scroll">
        <table>
            <tbody>
                <tr>
                    <th>日付</th>
                    <th>様式番号</th>
                    <th>項目</th>
                    <th>金額</th>
                    <th>入金元(関連者)</th>
                    <th>書証</th>
                    <th>編集</th>
                </tr>
                <tr v-for="(editEntity, index) in searchList">
                    <td><input type="date" v-model="editEntity.accrualDateValueString" @change="onDateChange(index)">
                    </td>
                    <td>
                        <YoushikiKbnIncomeSelect :youshiki-kbn="editEntity.youshikiKbn"
                            :youshiki-kbn-eda="editEntity.youshikiEdaKbn" :index="index"
                            @send-youshiki-kbn-interface="recieveYoushikiKbnInterface"></YoushikiKbnIncomeSelect>
                    </td>
                    <td>{{ editEntity.itemName }}</td>
                    <td>
                        <KingakuView :kingaku="editEntity.kingaku" :index="index" @send-kingaku="recieveKingaku">
                        </KingakuView>
                    </td>
                    <td>
                        <div class="form-group-vertical name-input">
                            <div>
                                <select v-model="editEntity.kanrenshaKbn" class="short-input"
                                    :disabled="!disableKanrenshaSelect(editEntity)">
                                    <option :value="ShuushiDocV5YoushikiEdaIncomeConstants.PERSON">{{
                                        ShuushiDocV5YoushikiEdaIncomeConstants.PERSON_TEXT }}</option>
                                    <option :value="ShuushiDocV5YoushikiEdaIncomeConstants.KIGYOU_DT">{{
                                        ShuushiDocV5YoushikiEdaIncomeConstants.KIGYOU_DT_TEXT }}</option>
                                    <option :value="ShuushiDocV5YoushikiEdaIncomeConstants.SEIJI_DANTAI">{{
                                        ShuushiDocV5YoushikiEdaIncomeConstants.SEIJI_DANTAI_TEXT }}</option>
                                </select><button class="left-space" @click="onKanrenshaSearch(index)">検索</button>

                            </div>
                            <div>
                                <input type="text" v-model="editEntity.kanrenshaCode" class="code-input"
                                    disabled="true">
                            </div>
                            <div>
                                <input type="text" v-model="editEntity.kanrenshaName" class="name-input"
                                    disabled="true">
                            </div>
                        </div>

                    </td>
                    <td><button>参照</button></td>
                    <td><button @click="onEdit(editEntity, index)">編集{{ convertRequiredString(editEntity.isEditRequire)
                    }}</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- ページング -->
    <PagingControl :all-count="allCount" :limit="limit" :page-number="pageNumber"
        @send-paging-number="recievePagingNumber"></PagingControl>


    <div class="one-line">
        <input type="number" v-model="showIndex"><button @click="onShowEntity" class="left-space">押す</button>
    </div>

    <!-- メッセージ -->
    <div class="overMessage" v-if="messageType !== MessageConstants.VIEW_NONE">
        <MessageView :info-level="infoLevel" :message-type="messageType" :title="MESS_PAGE_NAME" :message="message"
            :caller="caller" @send-submit="recieveSubmit">
        </MessageView>
    </div>

    <!-- 個人検索 -->
    <div v-if="isSearchPerson" class="overBackground"></div>
    <div v-if="isSearchPerson" class="overComponent">
        <SearchKanrenshaPerson @send-person-interface="recievePersonInterface" @send-cancel-person="recieveCancelPerson"
            :is-raise-commponet="true">
        </SearchKanrenshaPerson>

    </div>

    <!-- 企業団体検索 -->
    <div v-if="isSearchKigyouDt" class="overBackground"></div>
    <div v-if="isSearchKigyouDt" class="overComponent">
        <SearchKanrenshaKigyouDt @send-kigyou-dt-interface="recieveKigyouDtInterface"
            @send-cancel-kigyou-dt="recieveCancelKigyouDt" :is-raise-commponet="true">
        </SearchKanrenshaKigyouDt>
    </div>

    <!-- 政治団体検索 -->
    <div v-if="isSearchSeijidantai" class="overBackground"></div>
    <div v-if="isSearchSeijidantai" class="overComponent">
        <SearchKanrenshaSeijidantai @send-seijidantai-interface="recieveSeijidantaiInterface"
            @send-cancel-seijidantai="recieveCancelSeijidantai" :is-raise-commponet="true">
        </SearchKanrenshaSeijidantai>
    </div>

    <!-- 収支報告書収入編集 -->
    <div v-if="isShow" class="overBackground"></div>
    <div v-if="isShow" class="overComponent">
        <EditViewV05AllIncome @send-cancel-shuushi-edit="recieveCancel" @send-save-shuushi-edit="recieveSave"
            :index="selectedIndex" :entity="youshikiEntity"></EditViewV05AllIncome>
    </div>

</template>
<style scoped></style>
