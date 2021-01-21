import { Dimensions } from 'react-native';
import ProgramCard from './ProgramCard';
import ProgramList from './ProgramList';
import styles from './styles';

const { height, width } = Dimensions.get('window');


const Sizes = {
    small: {
        type: 'small',
        cardStyle: {
            width: width / 4,
        },
        cardImageStyle: {
            height: width / 4,
            width: width / 4
        },
        titleStyle: {
            fontSize: 22,
        }
    },
    medium: {
        type: 'medium',
        cardStyle: {
            width: width / 3
        },
        cardImageStyle: {
            height: width / 3,
            width: width / 3
        },
        titleStyle: {
            fontSize: 28,
        }
    },
    large: {
        type: 'large',
        cardStyle: {
            width: width / 2
        },
        cardImageStyle: {
            height: width / 2,
            width: width / 2
        },
        titleStyle: {
            fontSize: 34
        }
    },
};

export {
    ProgramList, ProgramCard, Sizes, styles,
};