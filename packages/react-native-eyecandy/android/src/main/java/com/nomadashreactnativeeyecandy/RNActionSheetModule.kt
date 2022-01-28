package com.nomadashreactnativeeyecandy

import com.facebook.react.bridge.*

class RNActionSheetModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String {
      return "RNActionSheet"
  }

  private var actionSheet: ActionSheet? = null

  @ReactMethod
  fun show(title: String?, items: ReadableArray, cancelIndex: Int, onClickCallback: Callback?) {
    val labels = arrayOfNulls<String>(items.size())
    for (i in 0 until items.size()) {
      labels[i] = items.getString(i)
    }
    actionSheet = ActionSheet(currentActivity!!, title, labels, cancelIndex, onClickCallback)
    actionSheet!!.show()
  }

  @ReactMethod
  fun hide() {
    actionSheet!!.hide()
  }
}
