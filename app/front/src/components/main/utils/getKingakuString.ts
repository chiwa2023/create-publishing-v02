const jpyFormatter = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
});

export default function getKingakuString(kingaku: number): string {
    return jpyFormatter.format(kingaku);
}