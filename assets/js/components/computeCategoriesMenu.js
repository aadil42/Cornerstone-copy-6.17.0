export default function computeCategoriesMenu({
    categories,
    custom_categories_navigation = {}
}) {

    return categories.map((cat) => {
        const custom = custom_categories_navigation[`id_${cat.id}`];

        const node = {
            label: custom?.desktop?.title || cat.name,
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
            custom_categories_navigation: custom_categories_navigation
        }
        );
        }

        return node;
    });
}