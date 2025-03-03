import { useState } from "react";

interface FolderProps {
    explorer: {
        id: string;
        name: string;
        isFolder: boolean;
        items: any[];
    };
    handleInsertNode: (folderId: string, item: string, isFolder: boolean) => void;
}

const Folder: React.FC<FolderProps> = ({ explorer, handleInsertNode }) => {

    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: false as boolean
    });

    const handleNewFolder = (e: any, isFolder: boolean) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({
            visible: true,
            isFolder: isFolder
        })
    }

    const onAddFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13 && e.currentTarget.value) {
            // add 
            handleInsertNode(explorer.id, e.currentTarget.value, showInput.isFolder);
            setShowInput({ ...showInput, visible: false });
        }
    };

    if (explorer.isFolder) {
        return (
            <div style={{ marginLeft: '10px' }}>
                <div className="folder" onClick={() => setExpand(!expand)}>
                    <span>{expand ? "🗁" : "🗀"} {explorer.name}</span>
                    <div className="">
                        <button type="button" onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
                        <button type="button" onClick={(e) => handleNewFolder(e, false)}>File +</button>
                    </div>
                </div>
                <div className="" style={{ display: expand ? 'block' : 'none', paddingLeft: '25px' }}>
                    {
                        showInput.visible && (
                            <div className="inputContainer">
                                <span>{showInput ? "🗀" : "🗏"}</span>
                                <input
                                    type="text"
                                    className="inputContainer__input"
                                    onKeyDown={(e) => onAddFolder(e)}
                                    autoFocus
                                    onBlur={() => setShowInput({ ...showInput, visible: false })}
                                />
                            </div>
                        )
                    }
                    {explorer.items.map((exp) => {
                        return (
                            <div className="" key={exp.id}>
                                <Folder explorer={exp} handleInsertNode={handleInsertNode} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div style={{ marginLeft: '10px' }}>
                <div className="file" >
                    <span>🗏 {explorer.name}</span>
                </div>
            </div>
        )
    }
}

export default Folder
