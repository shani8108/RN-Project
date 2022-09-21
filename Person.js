import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Init, AlterTable, AddNewPersons, SelectAllPersons, SearchPerson, DeletePerson, UpdatePerson, UpdateStyle } from './DBPerson';


export default function Person() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState(0);
    const [search, setSearch] = useState('');
    const [listOfPersons, setListOfPersons] = useState([]);
    const [indexEdit, setIndexEdit] = useState(-1);
    const [ShowEdit, setShowEdit] = useState(false);

    useEffect(() => {

        Init().then(() => {
            console.log("DB create good");
        }).catch(() => {
            console.log("DB create failed");
        });
        // AlterTable().then(() => {
        //     console.log("DB create good");
        // }).catch(() => {
        //     console.log("DB create failed");
        // });
    }, []);

    return (
        <View style={styles.container}>
            <Text>Persons List!</Text>
            <View>
                <TextInput placeholder='enter name:' keyboardType='name-phone-pad' onChangeText={(txtName) => {
                    setName(txtName);
                }}>{name}</TextInput>
                <TextInput placeholder='enter address:' keyboardType='name-phone-pad' onChangeText={(txtaddress) => {
                    setAddress(txtaddress);
                }}>{address}</TextInput>
                <TextInput placeholder='enter age:' keyboardType='number-pad' onChangeText={(txtage) => {
                    setAge(txtage);
                }}>{age}</TextInput>
                <Button title='Insert' onPress={() => {
                    //"nachman", "hashlosha 10", 23
                    AddNewPersons(name, address, age).then((result) => {
                        console.log(result);
                        console.log("sucsess insert to db");
                    }).catch((err) => {
                        console.log(err);
                    });

                    SelectAllPersons().then((result) => {
                        console.log(result.rows._array);
                        setListOfPersons(result.rows._array);
                    }).catch((err) => {
                        console.log(err);
                    });
                }}>
                </Button>
                <Button disabled={!ShowEdit} title="Save changes" onPress={() => {
                    //change
                    console.log(indexEdit, name, address, age);
                    UpdatePerson(indexEdit, name, address, age).then((result) => {
                        console.log(result);
                        console.log("sucsess update to db");
                    }).catch((err) => {
                        console.log(err);
                    });
                    SelectAllPersons().then((result) => {
                        console.log(result.rows._array);
                        setListOfPersons(result.rows._array);
                    }).catch((err) => {
                        console.log(err);
                    });
                    setShowEdit(false);
                }}></Button>
            </View>
            <View>
                <TextInput placeholder='search by name:' onChangeText={(txtsearch) => {
                    setSearch(txtsearch);
                }}></TextInput>
                <Button title='Search' onPress={() => {
                    SearchPerson(search).then((result) => {
                        console.log(result.rows._array);
                        setListOfPersons(result.rows._array);
                    }).catch((err) => {
                        console.log(err);
                    });
                }}>
                </Button>
            </View>
            <ScrollView>
                {listOfPersons.map((x, i) => {
                    return (<View style={styles.personStl} key={x.ID}>
                        <Text>{x.ID} : {x.Name} : {x.Address} : {x.Age}</Text>
                        <View style={styles.btnStl}>
                            <Button title='Edit' onPress={() => {
                                setName(x.Name);
                                setAddress(x.Address);
                                setAge(x.Age);
                                setIndexEdit(x.ID);
                                setShowEdit(true);
                            }}></Button>
                        </View>

                        <View style={styles.btnStl}>
                            <Button title='Delete' onPress={() => {
                                //delete from SQL
                                DeletePerson(x.ID).then((result) => {
                                    console.log(result.rows._array);
                                    //setListOfPersons(result.rows._array);
                                }).catch((err) => {
                                    console.log(err);
                                });
                                //select all details again.
                                SelectAllPersons().then((result) => {
                                    console.log(result.rows._array);
                                    setListOfPersons(result.rows._array);
                                }).catch((err) => {
                                    console.log(err);
                                });
                            }}></Button>
                        </View>
                        {/* style={styles.btnStl} */}
                        <View style={[styles.btnStl, { borderWidth: x.Border, borderColor: x.Color }]}>
                            <Button title='Edit Style' onPress={() => {
                                //update style from SQL
                                UpdateStyle(x.ID, x.Border + 1, "red").then((result) => {
                                    console.log(result.rows._array);
                                    //setListOfPersons(result.rows._array);
                                }).catch((err) => {
                                    console.log(err);
                                });
                                //select all details again.
                                SelectAllPersons().then((result) => {
                                    console.log(result.rows._array);
                                    setListOfPersons(result.rows._array);
                                }).catch((err) => {
                                    console.log(err);
                                });
                            }}></Button>
                        </View>

                    </View>)
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    btnStl: {
        //alignItems: 'center',
        width: 100,
        marginBottom: 10,
    },
    personStl: {
        //alignItems: 'center',
        borderWidth: 1,
        borderColor: "black",
        marginBottom: 10,
        width: 300

    }
});
