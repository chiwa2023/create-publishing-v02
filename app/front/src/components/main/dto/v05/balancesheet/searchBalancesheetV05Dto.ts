import { convertDateText, FrameworkPagingCapsuleDto, type FrameworkPagingCapsuleDtoInterface } from "seijishikin-jp-normalize_common-tool";

interface SearchBalancesheetV05DtoInterface extends FrameworkPagingCapsuleDtoInterface {
    /** 検索開始日 */
    startDate: string;

    /** 検索終了日 */
    endDate: string;

    /** 発生年 */
    tableYear: number;
}

class SearchBalancesheetV05Dto extends FrameworkPagingCapsuleDto
    implements SearchBalancesheetV05DtoInterface {

    /** 検索開始日 */
    startDate: string;

    /** 検索終了日 */
    endDate: string;

    /** 発生年 */
    tableYear: number;

    constructor() {
        super();

        const INIT_NUMBER: number = 0;
        // const INIT_STRING: string = "";
        // const INIT_BOOLEAN: boolean = false;
        const INIT_DATE: string = convertDateText(new Date());

        this.startDate = INIT_DATE;
        this.endDate = INIT_DATE;
        this.tableYear = INIT_NUMBER;
    }
}

export { type SearchBalancesheetV05DtoInterface, SearchBalancesheetV05Dto }
