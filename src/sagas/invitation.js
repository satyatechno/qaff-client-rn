import {put, takeLatest, select} from 'redux-saga/effects';
import QB from 'quickblox-react-native-sdk';

// import { token, freelancers, } from "src/selectors/Selector";

function* sendInvitationMessage(action) {
  // console.log('FREELANCER actionData', action.data);
  try {
    const dialogData = yield QB.chat.getDialogs({});
    const doesDialogExist = dialogData.dialogs.find((x) =>
      x.occupantsIds.find((id) => id === action.data.freelancerQbId),
    );

    console.log('dialogs', JSON.stringify(doesDialogExist, null, 2));
    if (doesDialogExist) {
      const message1 = {
        dialogId: doesDialogExist.id,
        body: action.data.message,
        properties: {
          customParam1: 'Invitation',
          customParam2: action.data.invitationId.toString(),
        },
        saveToHistory: true,
        markable: 0,
      };

      yield QB.chat.sendMessage(message1);
      console.log(' Invitation Message sent  successfully');

      // .then((res) => {
      //   console.log(' Invitation Message sent  successfully');
      // })
      // .catch((e) => {
      //   console.error('Couldnot send message message', e);
      // });
    } else {
      const dialog = yield QB.chat.createDialog({
        type: QB.chat.DIALOG_TYPE.CHAT,
        occupantsIds: [action.data.freelancerQbId],
        name: action.data.freelancerName,
      });
      yield put({
        type: 'UPDATE_CHAT_DIALOG',
        data: dialog,
      });
      yield QB.chat.getDialogMessages({
        dialogId: dialog.id,
        limit: 30,
        sort: {
          ascending: false,
          field: QB.chat.MESSAGES_SORT.FIELD.DATE_SENT,
        },
        markAsRead: true,
        skip: 0,
      });
      // .then((dialog) => {
      //   console.log('dialog created successfully', dialog);
      //   this.setState({dialogId: dialog.id, userId: dialog.userId});
      //   this.props.dispatch(UPDATE_CHAT_DIALOG(dialog));
      //   QB.chat
      //     .getDialogMessages({
      //       dialogId: dialog.id,
      //       limit: this.state.limit,
      //       sort: {
      //         ascending: false,
      //         field: QB.chat.MESSAGES_SORT.FIELD.DATE_SENT,
      //       },
      //       markAsRead: true,
      //       skip: 0,
      //     })
      //     .then((result) => {
      //       console.log('Message', JSON.stringify(result, null, 2));
      //       this.setState({
      //         hasMoreMessages: result.messages.length === 30 ? true : false,
      //       });
      //       this.setState({isLoading: false});
      //       this.props.dispatch(FETCH_MESSAGE(result.messages));
      //     })

      //     .catch((err) => {
      //       this.setState({isLoading: false});
      //       console.error('Couldnot reterieve messages ', err);
      //     });
      // })
      // .catch((e) => {
      //   // handle error
      //   console.error('Error while creating diALOG', e);
      // });
    }
    yield put({
      type: 'FETCH_PROJECT',
      data: {type: 'progress', page: 1},
    });
    // console.log('object', doesDialogExist);
  } catch (err) {
    console.log('couldnot fetch dialogs', err);
  }
}

export function* invitationActionWatcher() {
  yield takeLatest('SEND_INVITATION_MESSAGE', sendInvitationMessage);
}
