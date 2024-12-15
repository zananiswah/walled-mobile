//source: https://30dayscoding.com/blog/building-react-native-apps-with-react-native-dropdownpicker?srsltid=AfmBOor6M6gbi2ru58dbXUzZUYq-JbkhBRsChf0z9-rdMn75uWRAoO8j

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropdownPickerComponent = () => {
  const [items, setItems] = useState([
    { label: 'Byond Pay', value: 'option1' },
    { label: 'OVO', value: 'option2' },
    { label: 'Gopay', value: 'option3' },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false); 

  return (
    <View style={{ margin: 20 }}>
      <DropDownPicker
        open={open} // Mengontrol apakah dropdown terbuka
        value={selectedItem} // Nilai dari item yang dipilih
        items={items} // Daftar item
        setOpen={setOpen} // Fungsi untuk mengontrol state open
        setValue={setSelectedItem} // Fungsi untuk mengontrol state selectedItem
        setItems={setItems} // Fungsi untuk mengontrol daftar item
        multiple={false} // Nonaktifkan multiple selection
        placeholder="Select an option" // Placeholder
        style={{
          backgroundColor: 'white',
          borderColor: 'white',
          borderWidth: 1,
          width: '100%'
        }}
        dropDownContainerStyle={{
          backgroundColor: 'white',
          borderColor: 'white',
        }}
        textStyle={{
          fontSize: 16,
          color: 'black',
          fontFamily: "Opensans",
        }}
      />
    </View>
  );
};

export default DropdownPickerComponent;
