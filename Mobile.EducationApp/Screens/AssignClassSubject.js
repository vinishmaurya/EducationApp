import { View, Text, Button, ScrollView, FlatList, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
const AssignSubject = () => {

    const data = [
        { id: 'No', Name: 'Name', Medium: 'Medium', Section: 'Section', CoreSubject: 'Core Subject', ElectiveSubject: 'Elective Subject', Action: 'Action' },
        
    ];

    const item = ({ item }) => (
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray', padding: 20 }}>
            <View style={{ width: 40 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.id}</Text>
            </View>
            <View style={{ width: 130 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.Name}</Text>
            </View>
            <View style={{ width: 130 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.Medium}</Text>
            </View>
            <View style={{ width: 100 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.Section}</Text>
            </View>
            <View style={{ width: 100 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.CoreSubject}</Text>
            </View>
            <View style={{ width: 150 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.ElectiveSubject}</Text>
            </View>
            <View style={{ width: 100 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.Action}</Text>
            </View>
        </View >);
    return (
        <>
            <ScrollView>
                <View style={{ marginHorizontal: 15, marginBottom: 30 }}>
                    <View>
                        <View style={{ marginHorizontal: 0, marginVertical: 20 }}>
                            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Assign Class Subject</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={{ flexDirection: 'row', maxWidth: "auto" }}>
                            <View style={{ borderWidth: 2, backgroundColor: '#FFFFFF' }}>
                                <FlatList data={data} renderItem={item} keyExtractor={item => item.id.toString()} />
                                <Text style={{textAlign:'center',fontWeight:'500',fontSize:19,marginVertical:10}}>No Record Found</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default AssignSubject;