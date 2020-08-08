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
};
