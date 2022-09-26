import { View, Text, Image, ScrollView, FlatList, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
const Dashboard = () => {

    const pic = {
        uri: 'https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
    const data = [
        { id: 'No', name: 'Title', email: 'Description', Date: 'Date' },
        { id: 1, name: 'off', email: 'bob@gmail.com', Date: '12.02.1999' },
        { id: 2, name: 'on', email: 'mei@gmail.com', Date: '12.02.1999' },
        { id: 3, name: 'Class Room', email: 'steve@gmail.com', Date: '12.02.1999' },
        { id: 4, name: 'Copy Check', email: 'steve@gmail.com', Date: '12.02.1999' },
        { id: 5, name: 'Party', email: 'steve@gmail.com', Date: '12.02.1999' },
        { id: 6, name: '😢🎶', email: 'steve@gmail.com', Date: '12.02.1999' },
        { id: 7, name: 'Music', email: 'steve@gmail.com', Date: '12.02.1999' },
        { id: 8, name: 'Sports breck', email: 'steve@gmail.com', Date: '12.02.1999' },
        { id: 9, name: 'cricket', email: 'steve@gmail.com', Date: '12.02.1999' },
        { id: 10, name: ' breck', email: 'steve@gmail.com', Date: '12.02.1999' }
    ];
    const Teacher = [
        { id: 'No', name: 'Name', email: 'Designation', Date: 'Subject' },
        { id: 1, name: 'voltas ', email: 'voice.Princpal', Date: '----' },
        { id: 2, name: 'Vinish', email: 'Princpal', Date: 'C# & .NET' },
        { id: 3, name: ' Chhotu', email: 'Teacher', Date: 'English' }
    ];


    const item = ({ item }) => (
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray', padding: 20 }}>
            <View style={{ width: 40 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.id}</Text>
            </View>
            <View style={{ width: 130 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Text>
            </View>
            <View style={{ width: 130 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.email}</Text>
            </View>
            <View style={{ width: 100 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.Date}</Text>
            </View>
        </View >);
    const TeachersData = ({ item }) => (
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray', padding: 20 }}>
            <View style={{ width: 40 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.id}</Text>
            </View>
            <View style={{ marginHorizontal: 10, }}>
                <Image source={pic} style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 4 }} />

                {/* <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.id}</Text> */}
            </View>
            <View style={{ width: 130 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Text>
            </View>
            <View style={{ width: 130 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.email}</Text>
            </View>
            <View style={{ width: 100 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{item.Date}</Text>
            </View>
        </View >);
    return (
        <>
            <ScrollView>
                <View style={{ marginHorizontal: 15, marginBottom: 30 }}>
                    <LinearGradient colors={['#ffbf96', '#fe7096',]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }} style={{ width: "auto", padding: 8, borderRadius: 4, marginTop: 15, }} >
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <View style={{ width: 180, height: 160 }}>
                                <View style={{ padding: 25 }}>
                                    <Text style={{ fontWeight: '600', fontSize: 19, color: '#ffffff' }}>Total Student</Text>
                                    <Text style={{ fontWeight: '600', fontSize: 25, color: '#ffffff', marginTop: 18 }}>8</Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                    <View>
                        <LinearGradient colors={['#90caf9', '#047edf',]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }} style={{ width: "auto", padding: 8, borderRadius: 4, marginTop: 15, }} >
                            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                                <View style={{ width: 180, height: 160 }}>
                                    <View style={{ padding: 25 }}>
                                        <Text style={{ fontWeight: '600', fontSize: 19, color: '#ffffff' }}>Total Teacher</Text>
                                        <Text style={{ fontWeight: '600', fontSize: 25, color: '#ffffff', marginTop: 18 }}>3</Text>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                    <View>
                        <LinearGradient colors={['#84d9d2', '#07cdae',]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }} style={{ width: "auto", padding: 8, borderRadius: 4, marginTop: 15, }} >
                            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                                <View style={{ width: 180, height: 160 }}>
                                    <View style={{ padding: 25 }}>
                                        <Text style={{ fontWeight: '600', fontSize: 19, color: '#ffffff' }}>Total Parents</Text>
                                        <Text style={{ fontWeight: '600', fontSize: 25, color: '#ffffff', marginTop: 18 }}>4</Text>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                    <View>
                        <View style={{ marginHorizontal: 0, marginVertical: 20 }}>
                            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Teachers</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={{ flexDirection: 'row', maxWidth: "auto" }}>
                            <View style={{ borderWidth: 2, backgroundColor: '#FFFFFF' }}>
                                <FlatList data={Teacher} renderItem={TeachersData} keyExtractor={item => item.id.toString()} />
                            </View>
                        </ScrollView>
                    </View>
                    <View>
                        <View style={{ marginHorizontal: 0, marginVertical: 20 }}>
                            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Noticeboard</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={{ flexDirection: 'row', maxWidth: "auto" }}>
                            <View style={{ borderWidth: 2, backgroundColor: '#FFFFFF' }}>
                                <FlatList data={data} renderItem={item} keyExtractor={item => item.id.toString()} />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default Dashboard;