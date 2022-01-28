package com.nomadashreactnativeeyecandy;

import android.content.Context;
import android.content.DialogInterface;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.facebook.react.bridge.Callback;
import com.google.android.material.bottomsheet.BottomSheetDialog;

public class ActionSheet extends BottomSheetDialog {
    BottomSheetDialog mBottomSheetDialog;

    ActionSheet(@NonNull Context context, String title, String[] options, final int cancelIndex, final Callback onClickCallback) {
        super(context);
        View sheetView = this.getLayoutInflater().inflate(R.layout.action_sheet, null);
        RecyclerView mRecyclerView = sheetView.findViewById(R.id.list);
        mRecyclerView.setHasFixedSize(true);
        RecyclerView.LayoutManager mLayoutManager = new LinearLayoutManager(context);
        mRecyclerView.setLayoutManager(mLayoutManager);
        mBottomSheetDialog = new BottomSheetDialog(context);
        RecyclerView.Adapter mAdapter = new com.nomadashreactnativeeyecandy.ActionSheetAdapter(options, onClickCallback, this);
        mRecyclerView.setAdapter(mAdapter);
        if (sheetView.getParent() != null) {
            ((ViewGroup) sheetView.getParent()).removeView(sheetView); // <- fix
        }

        mBottomSheetDialog.setOnCancelListener(new DialogInterface.OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialog) {
               onClickCallback.invoke(cancelIndex);
            }
        });

        TextView tvTitle = (TextView) sheetView.findViewById(R.id.title);
        tvTitle.setText(title);
        mBottomSheetDialog.setContentView(sheetView);
    }

    public void show() {
        mBottomSheetDialog.show();
    }

    public void hide() {
        mBottomSheetDialog.dismiss();
    }
}
