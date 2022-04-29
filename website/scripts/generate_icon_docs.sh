#! /bin/bash

ICON_IMAGES_DIR="../static/img/icons"
OUTPUT_PATH="../docs/icons.mdx"

ICON_INSTALL_DOC_PATH="./icons-installation.md"
ICON_TEMPLATE_PATH="./icon-template.mdx"
ICON_PROPS_DOC_PATH="./icon-props.md"

COMPLETE_DOC_CONTENT="---\nid: icons\ntitle: Icons\n---\n\nimport ThemedIcon from '@site/src/components/ThemedIcon';\n\n$(cat $ICON_INSTALL_DOC_PATH)\n\n## Icons\n\n"

ICON_TEMPLATE_CONTENT=$(cat $ICON_TEMPLATE_PATH)

ICONS_MAX_COUNT=$(ls $ICON_IMAGES_DIR | grep -v -e "-dark\.svg$" | wc -l)

COUNT=0
for file in $ICON_IMAGES_DIR/*.svg; do
  case "$file" in
  *-dark.svg)
    continue
    ;;
  *)
    ICON_NAME=$(basename "$file" .svg)
    ICON_IMPORT_NAME=$(echo "$ICON_NAME" | sed "s/\(^\|-\)[a-z]/\u&/g")

    ICON_CONTENT=$(
      echo "$ICON_TEMPLATE_CONTENT" | sed "s/ICON_NAME/$ICON_NAME/g" | sed "s/ICON_IMPORT_NAME/$ICON_IMPORT_NAME/g"
    )

    if [ $COUNT -ne $(($ICONS_MAX_COUNT - 1)) ]; then
      ICON_CONTENT="$ICON_CONTENT\n\n---\n\n"
    else
      ICON_CONTENT="$ICON_CONTENT\n\n"
    fi

    COMPLETE_DOC_CONTENT="$COMPLETE_DOC_CONTENT$ICON_CONTENT"

    COUNT=$((COUNT + 1))
    ;;
  esac
done

COMPLETE_DOC_CONTENT="$COMPLETE_DOC_CONTENT$(cat $ICON_PROPS_DOC_PATH)\n"

echo -e "$COMPLETE_DOC_CONTENT" > $OUTPUT_PATH
