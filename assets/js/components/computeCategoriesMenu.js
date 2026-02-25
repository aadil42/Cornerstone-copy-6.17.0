export default function computeCategoriesMenu({
    categories,
    categoriesNavMetafields = {}
}) {

    return categories.map((cat) => {
        const custom = categoriesNavMetafields[`id_${cat.id}`];
        const node = {
            mobileLabel: custom?.mobile?.title || cat.name,
            desktopLabel: custom?.desktop?.title || cat.name,
            link: cat.url,
            bc: {
                ...cat,
                children: []
            }
        };

        if (custom) {
            node.bc.customImages = {
                desktop: custom.desktop?.image_url,
                mobile: custom.mobile?.image_url,
            };
        }

        if (Array.isArray(cat.children) && cat.children.length > 0) {
        node.children = computeCategoriesMenu(
        {
            categories: cat.children, 
            categoriesNavMetafields: categoriesNavMetafields
        }
        );
        }

        return node;
    });
}