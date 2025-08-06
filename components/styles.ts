// styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#F3E5F5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: -25,
    alignSelf: 'center',
    color: '#4A148C',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: -1,
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 8,
  },
  inputContent: {
    height: 15,
  },
  button: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
    marginBottom: 18,
    marginTop: 10,
  },
  buttonLabel: {
    fontSize: 8,
  },
  instruction: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#7E57C2',
    alignSelf: 'center',
    marginBottom: 10,
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  habitText: {
    fontSize: 18,
    color: '#4A148C',
    flex: 1,
  },
  emptyText: {
    fontStyle: 'italic',
    alignSelf: 'center',
    marginTop: 20,
    color: '#9575CD',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  doneButtonDone: {
    marginTop: 8,
    backgroundColor: '#7961a5ff',
  },
  doneButton: {
    backgroundColor: '#827492ff',
  },
  doneButtonLabel: {
    color: '#efecf3ff',
  },
  doneButtonLabelDone: {
    color: 'white',
  },
  glassButton: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  glassButtonDefault: {
    borderWidth: 1,
    borderColor: 'rgba(96, 43, 219, 0.3)',
  },
  glassButtonDone: {
    borderWidth: 1,
    borderColor: 'rgba(153, 100, 221, 0.5)',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  screenText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },


});
