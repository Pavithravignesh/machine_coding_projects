const useTraverseTree = () => {

    function insertNode(tree: any, folderId: string, item: string, isFolder: boolean) {
        // edge cases
        if (tree.id === folderId && tree.isFolder) {
            tree.items.unshift({
                id: new Date().getTime(),
                name: item,
                isFolder: isFolder,
                items: []
            });
            return tree;
        }


        // depth first search
        let latestNode = [];
        latestNode = tree.items.map((obj: any) => {
            return insertNode(obj, folderId, item, isFolder);
        });

        return { ...tree, items: latestNode };
    }

    return { insertNode }
};

export default useTraverseTree;