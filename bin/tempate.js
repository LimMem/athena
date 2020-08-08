const { lowCapitalizedString, capitalizedString } = require("./tools");

module.exports = {
  componentsWithName: (name) => {
    const upString = capitalizedString(name);
    const lowString = lowCapitalizedString(name);

    const tsxTemplate = `import React, { FC, useState, useEffect } from 'react'
import styles from './index.less'

interface ${upString}Props {

}

const ${upString}:FC<${upString}Props> = props => {
    const {} = props;

    // useEffect(() => {
        
    //     return () => {
            
    //     }
    // }, [])

    return <div className={styles.${lowString}}></div>
}

export default ${upString};`;

    const lessTemplate = `.${lowString}{

}`;
    return [
      {
        name: "index.tsx",
        temp: tsxTemplate,
      },
      {
        name: "index.less",
        temp: lessTemplate,
      },
    ];
  },

  pageWithName: (name) => {
    const lowString = lowCapitalizedString(name);
    const upString = capitalizedString(name);

    const tsxTemplate = `import React, { FC, useEffect } from 'react';
import { ${upString}ModelState, ConnectProps, connect } from 'alita';
import styles from './index.less';
        
interface PageProps extends ConnectProps {
    ${lowString}: ${upString}ModelState;
}
        
const ${upString}Page: FC<PageProps> = ({ ${lowString}, dispatch }) => {
    // 这里发起了初始化请求
    useEffect(() => {
    dispatch!({
        type: '${lowString}/query',
    });
    return () => {
        // 这里写一些需要消除副作用的代码
        // 如: 声明周期中写在 componentWillUnmount
    };
    }, []);
    // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
    const { name } = ${lowString};
    return <div className={styles.${lowString}}>Hello {${lowString}}</div>;
};

export default connect(({ ${lowString} }:{ ${lowString}: ${upString}ModelState; }) => ({ ${lowString} }))(${upString}Page);`;

    const lessTemplate = `.${lowString}{}`;

    return [
      {
        name: "index.tsx",
        temp: tsxTemplate,
      },
      {
        name: "index.less",
        temp: lessTemplate,
      },
    ];
  },

  modelFileWithName: (name) => {
    const lowString = lowCapitalizedString(name);
    const upString = capitalizedString(name);

    const tsTemplate = `import { Reducer } from "redux";
import { query } from "@/services/api";
import { Effect } from "alita";

export interface ${upString}ModelState {
    name: string;
}

export interface ${upString}ModelType {
    namespace: "${lowString}";
    state: ${upString}ModelState;
    effects: {
    query: Effect;
    };
    reducers: {
    save: Reducer<${upString}ModelState>;
    };
}

const ${upString}Model: ${upString}ModelType = {
    namespace: "${lowString}",

    state: {
    name: "",
    },

    effects: {
    *query({ payload }, { call, put }) {
        const data = yield call(query, payload);
        yield put({
        type: "save",
        payload: { name: data.text },
        });
    },
    },
    reducers: {
    save(state, action) {
        return {
        ...state,
        ...action.payload,
        };
    },
    },
};

export default ${upString}Model;`;

    return [
      {
        name: `${lowString}.ts`,
        temp: tsTemplate,
      },
    ];
  },
};
