package com.nomada.eyecandy;

import android.annotation.SuppressLint;
import android.content.res.Resources;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;

import androidx.recyclerview.widget.RecyclerView;

import com.facebook.react.bridge.Callback;
import com.nomada.eyecandy.R;

public class ActionSheetAdapter extends RecyclerView.Adapter<ActionSheetAdapter.MyViewHolder> {
    private String[] mDataset;
    private Callback callback;
    private ActionSheet actionSheet;
    private boolean mDark;

    public static class MyViewHolder extends RecyclerView.ViewHolder {
        public LinearLayout linearLayout;
        public MyViewHolder(LinearLayout v) {
            super(v);
            linearLayout = v;
        }
    }

    public ActionSheetAdapter(String[] myDataset, Callback onClickCallback, boolean dark, ActionSheet actionSheetC) {
        mDataset = myDataset;
        callback = onClickCallback;
        actionSheet = actionSheetC;
        mDark = dark;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LinearLayout linearLayout = (LinearLayout) LayoutInflater.from(parent.getContext())
                .inflate(R.layout.action_sheet_item, parent, false);
        MyViewHolder vh = new MyViewHolder(linearLayout);
        return vh;
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, @SuppressLint("RecyclerView") final int position) {
        Button button = (Button) holder.linearLayout.findViewById(R.id.btn);
        button.setText(mDataset[position]);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                callback.invoke(position);
                actionSheet.hide();
            }
        });
    }

    @Override
    public int getItemCount() {
        return mDataset.length;
    }
}
