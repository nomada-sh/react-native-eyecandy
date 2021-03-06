package com.nomada.eyecandy;

import android.content.Context;
import android.content.DialogInterface;
import android.graphics.Color;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.facebook.react.bridge.Callback;
import com.google.android.material.bottomsheet.BottomSheetDialog;
import com.nomada.eyecandy.R;

public class ActionSheet extends BottomSheetDialog {
    BottomSheetDialog mBottomSheetDialog;

    ActionSheet(@NonNull Context context,
                String title, String[] options,
                final int cancelIndex,
                final String userInterfaceStyle,
                final Callback onClickCallback
    ) {
        super(context);
        boolean dark = userInterfaceStyle != null && userInterfaceStyle == "dark";

        View sheetView = this.getLayoutInflater().inflate(R.layout.action_sheet, null);
        RecyclerView mRecyclerView = sheetView.findViewById(R.id.list);
        mRecyclerView.setHasFixedSize(true);
        RecyclerView.LayoutManager mLayoutManager = new LinearLayoutManager(context);
        mRecyclerView.setLayoutManager(mLayoutManager);
        mBottomSheetDialog = new BottomSheetDialog(context);
        RecyclerView.Adapter mAdapter = new ActionSheetAdapter(options, onClickCallback, dark, this);
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
        tvTitle.setVisibility(title == null ? View.GONE : View.VISIBLE);

        sheetView.setBackgroundColor(
          dark ?
            Color.parseColor("#000000") :
            Color.parseColor("#ffffff")
        );

        mBottomSheetDialog.setContentView(sheetView);
    }

    public void show() {
        mBottomSheetDialog.show();
    }

    public void hide() {
        mBottomSheetDialog.dismiss();
    }
}
