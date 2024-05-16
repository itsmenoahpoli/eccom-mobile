import React, { useState, useRef } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import searchIcon from '../assets/search.png';
import backIcon from '../assets/back.png';

function SearchContainer({ onSearch, onToggleRecentSearches }) {
    const [recentSearches, setRecentSearches] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [containerHeight, setContainerHeight] = useState(50); // Initial height of the container
    const [isExpanded, setIsExpanded] = useState(false);
    const [showRecentSearches, setShowRecentSearches] = useState(false);
    const searchInputRef = useRef(null); // Reference to the search input element

    const handleToggleSearch = () => {
        setIsExpanded(!isExpanded);
        onToggleRecentSearches(); // Toggle recent searches visibility
        setShowRecentSearches(!showRecentSearches || isExpanded); // Show recent searches when expanding the search bar
        if (!isExpanded) {
            // Focus on the search input when expanding the search bar
            setTimeout(() => {
                searchInputRef.current.focus();
            }, 200); // Delay to allow animation to complete
        }
    };

    const handleClick = () => {
        if (searchQuery.trim() !== '') {
        onSearch(searchQuery);
        if (!recentSearches.includes(searchQuery.trim())) {
            setRecentSearches([searchQuery.trim(), ...recentSearches]);
        }
        setSearchQuery('');
    }
};

    const handleSearchBoxFocus = () => {
        setContainerHeight(300);
        setShowRecentSearches(true); // Show recent searches when search box is focused
    };

    const handleSearchBoxBlur = () => {
        if (!isExpanded) {
        setShowRecentSearches(false); // Hide recent searches when search box loses focus
        }
    };

    const handleRecentSearchClick = (searchTerm) => {
        onSearch(searchTerm);
        setSearchQuery(searchTerm); // Fill search box with selected recent search term
        setContainerHeight(50);
        setShowRecentSearches(false); // Hide recent searches after selecting a recent search term
    };

    const handleClearRecentSearches = () => {
        setRecentSearches([]);
        setShowRecentSearches(false); // Hide recent searches after clearing
    };

    return (
        <View style={{ width: '100%', marginTop: 10 }}>
            {isExpanded ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#161616', borderRadius: 20 }}>
                    <TouchableOpacity onPress={handleToggleSearch} style={{ paddingHorizontal: 10 }}>
                        <Image source={backIcon} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            ref={searchInputRef} // Assign the ref to the search input element
                            style={{
                                paddingVertical: 8,
                                paddingHorizontal: 8,
                                marginRight: 10,
                                borderWidth: 0,
                                fontSize: 16,
                                backgroundColor: '#4f5458',
                                color: 'white',
                                borderRadius: 20,
                            }}
                            placeholder="Search products..."
                            placeholderTextColor="#B8B3B1"
                            onFocus={handleSearchBoxFocus}
                            onBlur={handleSearchBoxBlur}
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                            onSubmitEditing={handleClick}
                        />
                    </View>
                    <TouchableOpacity onPress={handleClick} style={{ position: 'absolute', right: 20, top: '50%', transform: [{ translateY: -12 }] }}>
                        <Image source={searchIcon} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity onPress={handleToggleSearch} style={{ paddingHorizontal: 10, alignItems: 'flex-end', marginTop: 4, marginRight: 10 }}>
                    <Image source={searchIcon} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
            )}
            {isExpanded && showRecentSearches && (
                <View style={{ height: containerHeight, overflow: 'hidden' }}>
                    <Text style={{ fontSize: 20, color: '#D3D3D3', marginTop: 8, marginLeft: 12, fontWeight: 'bold' }}>Recent</Text>
                    <ScrollView style={{ maxHeight: 150 }}>
                        {recentSearches.map((searchTerm, index) => (
                            <TouchableOpacity key={index} onPress={() => handleRecentSearchClick(searchTerm)}>
                                <Text style={[styles.recentSearchItem, { marginLeft: 10, marginRight: 10, marginTop: 5 }]}>{searchTerm}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    {isExpanded && (
                    <TouchableOpacity onPress={handleClearRecentSearches} style={{ alignItems: 'center', marginTop: 5 }}>
                        <Text style={{ fontSize: 12, color: '#4f5458', textDecorationLine: 'underline' }}>Clear recent searches</Text>
                    </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    recentSearchItem: {
        fontSize: 17,
        color: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 2,
        paddingLeft: 2,
    },
});

export default SearchContainer;