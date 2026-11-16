export default class RoutePathConstants {

    /** ドメイン */
    static readonly DOMAIN: string = import.meta.env.VITE_API_DOMAIN;

    /** ベース */
    static readonly BASE_PATH: string = "";

    /** ログインページ */
    static readonly PAGE_LOGIN: string = this.BASE_PATH + "/";

    /** ログアウトページ */
    static readonly PAGE_LOGOUT: string = this.BASE_PATH + "/logout";

    /** 仮メニュー */
    static readonly PAGE_MENU_TEMP: string = this.BASE_PATH + "/menu-temp";

    // /** 開発台紙 */
    static readonly PAGE_COMPONENT: string = this.BASE_PATH + "/component";

}
