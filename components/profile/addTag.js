import React from 'react';
import { Modal } from 'react-native';
import {
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
  Toast,
  Card,
  CardItem,
  Picker,
  Spinner,
  Title,
  Header,
  Button,
  Body,
  Content
} from 'native-base';

const AddTag = props => {
  const [loading, setLoading] = React.useState(props.allTags.length === 0);
  const [selectedTag, setSelectedTag] = React.useState(props.allTags[0]);

  const addTag = async () => {
    if (props.tags.includes(selectedTag))
      Toast.show({ text: 'Tag already subscribed.', duration: 3000 });
    else {
      try {
        setLoading(true);
        await props.add(selectedTag);
      } catch (err) {
        Toast.show({
          text: 'An error occured. Try again later.',
          duration: 3000
        });
      }
      setLoading(false);
    }
  };

  const deleteTag = async tag => {
    try {
      setLoading(true);
      await props.delete(tag);
    } catch (err) {
      Toast.show({
        text: 'An error occured. Try again later.',
        duration: 3000
      });
    }
    setLoading(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.open}
      onRequestClose={props.onClose}
    >
      <Header>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" onPress={props.onClose} />
          </Button>
        </Left>
        <Body>
          <Title>Subscribed Tags</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        {loading ? (
          <Spinner color="blue" />
        ) : (
          <React.Fragment>
            <List>
              {props.tags.map(tag => (
                <ListItem key={tag.tag_id}>
                  <Left>
                    <Text>{tag.name}</Text>
                  </Left>
                  <Right>
                    <Button transparent onPress={() => deleteTag(tag)}>
                      <Icon
                        type="AntDesign"
                        name="delete"
                        style={{ color: 'red' }}
                      />
                    </Button>
                  </Right>
                </ListItem>
              ))}
            </List>
            <Card>
              <CardItem>
                <Picker
                  style={{ width: 120 }}
                  selectedValue={selectedTag.name}
                  onValueChange={setSelectedTag}
                >
                  {props.allTags.map(tag => (
                    <Picker.Item
                      label={tag.name}
                      value={tag}
                      key={tag.tag_id}
                    />
                  ))}
                </Picker>
                <Button primary onPress={addTag}>
                  <Icon name="ios-add" />
                </Button>
              </CardItem>
            </Card>
          </React.Fragment>
        )}
      </Content>
    </Modal>
  );
};

export default AddTag;
