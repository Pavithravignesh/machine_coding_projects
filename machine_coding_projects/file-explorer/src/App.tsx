import { useState } from 'react'
import './App.css'
import explorer from './data/explorerData';
import Folder from './components/Folder';
import './styles.css';
import useTraverseTree from './hooks/useTraverseTree';

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  // console.log(explorerData);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId: string, item: string, isFolder: boolean) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);

    setExplorerData(finalTree);
  };

  return (
    <>
      <Folder explorer={explorerData} handleInsertNode={handleInsertNode} />
    </>
  )
}

export default App
