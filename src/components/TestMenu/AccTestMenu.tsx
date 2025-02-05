import React, { useEffect, useContext } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { addDescribeBlock, createNewTest } from '../../context/actions/accTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/useGenerateTest.jsx';
import {
  updateFile,
  setFilePath,
  toggleRightPanel,
  setValidCode,
} from '../../context/actions/globalActions';
import { AccTestCaseContext } from '../../context/reducers/accTestCaseReducer';
import { useToggleModal } from './testMenuHooks';


const AccTestMenu = () => {
  // link to accessibility testing docs url
  const accUrl = 'https://www.deque.com/axe/core-documentation/api-documentation/'; 

  // initialize hooks
  const { title, isModalOpen, openModal, openScriptModal, closeModal } = useToggleModal('acc');
  const [accTestCase, dispatchToAccTestCase] = useContext(AccTestCaseContext);
  const [{ projectFilePath, file, exportBool }, dispatchToGlobal] = useContext(GlobalContext);
  const generateTest = useGenerateTest('acc', projectFilePath);

  // setValidCode to true on load. 
  useEffect(() => {
    dispatchToGlobal(setValidCode(true));
  }, []);

  // handle change to add a Describe Block
  const handleAddDescribeBlock = () => {
    dispatchToAccTestCase(addDescribeBlock());
  };

  // handle change to open accessibility URL docs on right panel
  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(accUrl));
  };

  // handle change for 'preview' button to generate test
  const fileHandle = () => {
    dispatchToGlobal(updateFile(generateTest(accTestCase)));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
  };

  if (!file && exportBool) dispatchToGlobal(updateFile(generateTest(accTestCase)));

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openModal}>New Test +</button>
          <button onClick={fileHandle}>Preview</button>
          <button id={styles.example} onClick={openScriptModal}>
            Run Test
          </button>
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
          <Modal
            title={title}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            dispatchToMockData={null}
            dispatchTestCase={dispatchToAccTestCase}
            createTest={createNewTest}
          />
          {/* Just send user to docs on button click */}
        </div>

        <div
          id={styles.right}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button data-testid='addDescribeButton' onClick={handleAddDescribeBlock}>
            +Describe Block
          </button>
        </div>
      </div>
    </div>
    
  );
}

export default AccTestMenu;