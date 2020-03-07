import { Dimensions} from 'react-native';

export const {width} = Dimensions.get('window')

export function px(size) {
    return width / 750 * size
}