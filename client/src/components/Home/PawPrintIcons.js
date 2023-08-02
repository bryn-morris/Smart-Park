import {Icon} from 'semantic-ui-react'

function PawPrintIcons ({selectedIcon}) {

    const iconNameList = Array.from({ length: 12 }, () => 'paw');

    const icons = iconNameList.slice(0, selectedIcon + 1);

    return(
        <div>
            {icons.map((eachIcon, eachIndex) => (
                <Icon
                    key={`dog-paw-${eachIndex}`}
                    className={`massive ui ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;${eachIndex + 2}`}
                    name={eachIcon}
                />
                ))    
            }
        </div>
    )
} 

export default PawPrintIcons