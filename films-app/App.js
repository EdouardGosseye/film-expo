import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { useEffect } from 'react';


export default function App() {
useEffect(() => {
console.log('[App] mounted');
return () => console.log('[App] unmounted');
}, []);


return (
<NavigationContainer>
<RootNavigator />
</NavigationContainer>
);
}