import React, { useContext, useReducer } from 'react';
import cn from 'classnames';
import styles from './TestCase.module.scss';
import {
  updateDescribeText,
  updateItStatementText,
} from '../../context/actions/accTestCaseActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import SearchInput from '../SearchInput/SearchInput';

// ### this ties in with Sharon's code - did not create a file ### VERIFY PATH
import AccTestMenu from '../TestMenu/AccTestMenu';

import DecribeRenderer from '../AccTestComponent/DescribeRenderer/DescribeRenderer';
import { updateImportFilePath } from '../../context/actions/accTestCaseActions';
import {
  AccTestCaseContext,
  accTestCaseState,
  accTestCaseReducer,
} from '../../context/reducers/accTestCaseReducer';

const AccTestCase = () => {
  const [accTestCase, dispatchToAccTestCase] = useContext(
    AccTestCaseContext,
  );

  const { describeBlocks, itStatements, statements } = accTestCase;

  const [{ filePathMap }] = useContext(GlobalContext);
  const draggableStatements = describeBlocks.allIds;

  const handleChangeDescribeText = (e) => {
    const text = e.target.value;
    const describeId = e.target.id;
    dispatchToAccTestCase(updateDescribeText(text, describeId));
  };

  const handleChangeItStatementText = (e) => {
    const text = e.target.value;
    const itId = e.target.id;
    dispatchToAccTestCase(updateItStatementText(text, itId));
  };

  return (
    <div id={styles.AccTestCase}>

      <div id="head">
        <AccTestMenu />
      </div>

      <section id={styles.testCaseHeader}>
        <label htmlFor="fileImport">Import File From</label>
        <div id={styles.labelInput} style={{ width: '80%' }}>
          <SearchInput
            options={Object.keys(filePathMap)}
            dispatch={dispatchToAccTestCase}
            action={updateImportFilePath}
            filePathMap={filePathMap}
          />
        </div>

        <DecribeRenderer
          dispatcher={dispatchToAccTestCase}
          draggableStatements={draggableStatements}
          describeBlocks={describeBlocks}
          itStatements={itStatements}
          statements={statements}
          handleChangeDescribeText={handleChangeDescribeText}
          handleChangeItStatementText={handleChangeItStatementText}
          type="acc"
        />
      </section>

    </div>
  );
};
export default AccTestCase;
