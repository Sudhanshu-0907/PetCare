import {createNavigationContainerRef} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function push(...args) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(...args));
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.current?.goBack();
  }
}

export function resetLevelOfStack(name, index) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: index,
      routes: [{name: name}],
    });
  }
}
