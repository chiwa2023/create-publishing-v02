import { ShuushiDocV5YoushikiEdaIncomeConstants, ShuushiDocV5YoushikiKbnConstants } from 'seijishikin-jp-normalize';
import { describe, it, expect } from 'vitest';
import { ref, watch, toRaw, type Ref } from 'vue';

// Node環境でのsessionStorageモック
if (typeof globalThis.sessionStorage === 'undefined') {
    const store = new Map<string, string>();
    globalThis.sessionStorage = {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => store.set(key, String(value)),
        removeItem: (key: string) => store.delete(key),
        clear: () => store.clear(),
        key: (index: number) => Array.from(store.keys())[index] ?? null,
        length: 0,
    };
}

describe('EditIncome -> EditViewV05AllIncome -> EditViewV05Youshiki03 Entity propagation test', () => {
    it('should correctly propagate editEntity from searchList through AllIncome to Youshiki03', async () => {
        const { BalancesheetIncomeV05BaseEntity } = await import('../main/entity/balancesheetIncomeV05BaseEntity');
        type BalancesheetIncomeV05BaseEntityInterface = InstanceType<typeof BalancesheetIncomeV05BaseEntity>;

        // 1. EditIncome.vue側: searchListの作成と編集ボタン押下時の状態
        const searchList: Ref<BalancesheetIncomeV05BaseEntityInterface[]> = ref([]);
        const editEntity1 = new BalancesheetIncomeV05BaseEntity();
        editEntity1.youshikiKbn = ShuushiDocV5YoushikiKbnConstants.KIKANSHI;
        editEntity1.itemName = "機関誌定期購読料";
        editEntity1.kingaku = 50000;
        editEntity1.kanrenshaCode = "123-456789";
        editEntity1.kanrenshaName = "迂回献金　太郎";
        editEntity1.kanrenshaKbn = ShuushiDocV5YoushikiEdaIncomeConstants.PERSON;
        searchList.value.push(editEntity1);

        const selectedIndex = ref(0);
        const youshikiEntity = ref(new BalancesheetIncomeV05BaseEntity());
        const isShow = ref(false);

        // onEdit相当
        function onEdit(entity: BalancesheetIncomeV05BaseEntityInterface, index: number) {
            youshikiEntity.value = entity;
            selectedIndex.value = index;
            isShow.value = true;
        }

        onEdit(searchList.value[0], 0);

        expect(isShow.value).toBe(true);
        expect(selectedIndex.value).toBe(0);
        expect(youshikiEntity.value.kanrenshaName).toBe("迂回献金　太郎");
        expect(youshikiEntity.value.kingaku).toBe(50000);

        // 2. EditViewV05AllIncome.vue側: propsを受け取り、Youshiki03へパススルー
        const allIncomeProps = {
            entity: youshikiEntity.value,
            index: selectedIndex.value,
        };

        const isShowYoushiki03 = ShuushiDocV5YoushikiKbnConstants.KIKANSHI === allIncomeProps.entity.youshikiKbn;
        expect(isShowYoushiki03).toBe(true);

        // 3. EditViewV05Youshiki03.vue側: propsを受け取り、editEntityを初期化・同期
        const youshiki03Props = {
            entity: allIncomeProps.entity,
            index: allIncomeProps.index,
        };

        const y03EditEntity: Ref<BalancesheetIncomeV05BaseEntityInterface> = ref(new BalancesheetIncomeV05BaseEntity());

        // watch (EditViewV05Youshiki03.vueの実装と同じロジック)
        const unwatch = watch(
            () => youshiki03Props.entity,
            (newEntity) => {
                if (newEntity) {
                    y03EditEntity.value = structuredClone(toRaw(newEntity));
                }
            },
            { immediate: true, deep: true }
        );

        // 到達確認
        expect(y03EditEntity.value.youshikiKbn).toBe(ShuushiDocV5YoushikiKbnConstants.KIKANSHI);
        expect(y03EditEntity.value.itemName).toBe("機関誌定期購読料");
        expect(y03EditEntity.value.kingaku).toBe(50000);
        expect(y03EditEntity.value.kanrenshaName).toBe("迂回献金　太郎");
        expect(y03EditEntity.value.kanrenshaCode).toBe("123-456789");

        // 4. Youshiki03で編集して保存するシナリオ
        y03EditEntity.value.itemName = "更新された事業の種類";
        y03EditEntity.value.kingaku = 75000;

        // 親(searchList)は保存前には変更されていないこと(独立したコピーであること)
        expect(searchList.value[0].itemName).toBe("機関誌定期購読料");
        expect(searchList.value[0].kingaku).toBe(50000);

        // onSave -> recieveSave
        function recieveSave(savedEntity: BalancesheetIncomeV05BaseEntityInterface, index: number) {
            searchList.value[index] = structuredClone(toRaw(savedEntity));
            isShow.value = false;
        }

        recieveSave(y03EditEntity.value, youshiki03Props.index);

        expect(isShow.value).toBe(false);
        expect(searchList.value[0].itemName).toBe("更新された事業の種類");
        expect(searchList.value[0].kingaku).toBe(75000);

        unwatch();
    });
});
