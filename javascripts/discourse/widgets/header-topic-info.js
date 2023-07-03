import { applyDecorators, createWidget } from "discourse/widgets/widget";
import DiscourseURL from "discourse/lib/url";
import I18n from "I18n";
import RawHtml from "discourse/widgets/raw-html";
import { avatarImg } from "discourse/widgets/post";
import getURL from "discourse-common/lib/get-url";
import { h } from "virtual-dom";
import { iconNode } from "discourse-common/lib/icon-library";
import renderTags from "discourse/lib/render-tags";
import { topicFeaturedLinkNode } from "discourse/lib/render-topic-featured-link";

createWidget("topic-header-participant", {
  tagName: "span",

  buildClasses(attrs) {
    return `trigger-${attrs.type}-card`;
  },

  html(attrs) {
    const { user, group } = attrs;
    let content, url;

    if (attrs.type === "user") {
      content = avatarImg("tiny", {
        template: user.avatar_template,
        username: user.username,
      });
      url = user.get("path");
    } else {
      content = [iconNode("users")];
      url = getURL(`/g/${group.name}`);
      content.push(h("span", group.name));
    }

    return h(
      "a.icon",
      {
        attributes: {
          href: url,
          "data-auto-route": true,
          title: attrs.username,
        },
      },
      content
    );
  },

  click(e) {
    this.appEvents.trigger(
      `topic-header:trigger-${this.attrs.type}-card`,
      this.attrs.username,
      e.target
    );
    e.preventDefault();
  },
});

export default createWidget("header-topic-info", {
  tagName: "div.extra-info-wrapper",
  contents: null,
  title: null,

  html() {
    return ''
  }
});