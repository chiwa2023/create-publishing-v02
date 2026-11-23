import { convertDateText } from "seijishikin-jp-normalize_common-tool";

interface BalancesheetIncomeV05BaseEntityInterface {

    /** 発生年 */
    tableYear: number;

    /** 様式区分 */
    youshikiKbn: number;

    /** 様式枝区分項目 */
    youshikiEdaKbn: number;

    /** 金額 */
    kingaku: number;

    /** 発生日(和暦) */
    accrualDate: string;

    /** 発生日実値(西暦テキスト) */
    accrualDateValueString: string;

    /** 項目名称 */
    itemName: string;

    /** 開催場所 */
    kaisaiBasho: string;

    /** 支払い数*/
    shiharaisu: number;

    /** 関連者区分 */
    kanrenshaKbn: number;

    /** 関連Id */
    kanrenshaId: number;

    /** 関連者Code */
    kanrenshaCode: string;

    /** 関連者名称 */
    kanrenshaName: string;

    /** 関連者住所 */
    kanrenshaAddress: string;

    /** 関連者職業 */
    kanrenshaShokugyou: string;

    /** 編集必須 */
    isEditRequire: boolean;

    /** 備考 */
    bikou: string;

    /** あっせんの期間 */
    periodMediate: string;

    /** 税額控除フラグ */
    flgZeigakuKohjo: number;

    /** 通し番号 */
    tohshibangou: number;

}

class BalancesheetIncomeV05BaseEntity implements BalancesheetIncomeV05BaseEntityInterface {

    /** 発生年 */
    tableYear: number;


    /** 様式区分 */
    youshikiKbn: number;

    /** 様式枝区分項目 */
    youshikiEdaKbn: number;

    /** 金額 */
    kingaku: number;

    /** 発生日(和暦) */
    accrualDate: string;

    /** 発生日実値(西暦テキスト) */
    accrualDateValueString: string;

    /** 項目名称 */
    itemName: string;

    /** 開催場所 */
    kaisaiBasho: string;

    /** 支払い数*/
    shiharaisu: number;

    /** 関連者区分 */
    kanrenshaKbn: number;

    /** 関連者区分 */
    kanrenshaId: number;

    /** 関連者区分 */
    kanrenshaCode: string;

    /** 関連者名称 */
    kanrenshaName: string;

    /** 関連者住所 */
    kanrenshaAddress: string;

    /** 関連者職業 */
    kanrenshaShokugyou: string;

    /** 編集必須 */
    isEditRequire: boolean;

    /** 関連者選択不可 */
    disableKanrenshaSelect: boolean;

    /** 備考 */
    bikou: string;

    /** あっせんの期間 */
    periodMediate: string;

    /** 税額控除フラグ */
    flgZeigakuKohjo: number;

    /** 通し番号 */
    tohshibangou: number;

    constructor() {

        const INIT_NUMBER: number = 0;
        const INIT_STRING: string = "";
        const INIT_BOOLEAN: boolean = false;
        const INIT_DATE: string = convertDateText(new Date());

        this.tableYear = INIT_NUMBER;
        this.youshikiKbn = INIT_NUMBER;
        this.youshikiEdaKbn = INIT_NUMBER;
        this.kingaku = INIT_NUMBER;
        this.accrualDate = INIT_STRING;
        this.accrualDateValueString = INIT_DATE;
        this.itemName = INIT_STRING;
        this.kaisaiBasho = INIT_STRING;
        this.shiharaisu = INIT_NUMBER;
        this.kanrenshaKbn = INIT_NUMBER;
        this.kanrenshaId = INIT_NUMBER;
        this.kanrenshaCode = INIT_STRING
        this.kanrenshaName = INIT_STRING;
        this.kanrenshaAddress = INIT_STRING;
        this.kanrenshaShokugyou = INIT_STRING;
        this.flgZeigakuKohjo = INIT_NUMBER;
        this.tohshibangou = INIT_NUMBER;
        this.isEditRequire = INIT_BOOLEAN;
        this.disableKanrenshaSelect = true;
        this.bikou = INIT_STRING;
        this.periodMediate = INIT_STRING;
    }
}

export { type BalancesheetIncomeV05BaseEntityInterface, BalancesheetIncomeV05BaseEntity }
