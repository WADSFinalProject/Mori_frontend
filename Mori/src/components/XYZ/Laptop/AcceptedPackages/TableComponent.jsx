import React from "react";

export const TableComponent = ({ data }) => {
  return (
    <div className="overflow-auto rounded-md border-2 border-solid max-h-96">
      <table className="w-full border-separate border-spacing-0">
        <thead className="sticky bg-white top-0 z-10">
          <tr>
            <th className="text-base font-medium text-left border-b-2 py-3">
              <div className="flex flex-row items-center justify-center gap-1.5">
                <svg
                  className="pt-0.5"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.93377 11.176H1.36255C0.776109 11.176 0.399902 10.8427 0.399902 10.3761C0.399902 9.77609 0.864628 9.37612 1.59491 9.37612H3.3653L4.04026 6.48103H2.36946C1.78302 6.48103 1.40681 6.14772 1.40681 5.68108C1.40681 5.08111 1.8826 4.68113 2.60182 4.68113H4.44966L5.14675 1.8051C5.27952 1.2337 5.65573 0.938477 6.28643 0.938477C6.88394 0.938477 7.26014 1.2337 7.26014 1.72891C7.26014 1.82414 7.23801 1.95747 7.21588 2.0527L6.60731 4.68113H9.79401L10.48 1.81462C10.6128 1.2337 10.989 0.938477 11.6197 0.938477C12.2172 0.938477 12.5934 1.2337 12.5934 1.72891C12.5934 1.82414 12.5824 1.95747 12.5492 2.0527L11.9295 4.68113H13.5782C14.1646 4.68113 14.5298 4.9954 14.5298 5.47157C14.5298 6.07153 14.0651 6.47151 13.3458 6.47151H11.5091L10.823 9.36659H12.5492C13.1356 9.36659 13.5007 9.69039 13.5007 10.1665C13.5007 10.7665 13.036 11.176 12.3168 11.176H10.4136L9.69442 14.1854C9.56164 14.7663 9.18544 15.0615 8.55474 15.0615C7.95723 15.0615 7.58102 14.7663 7.58102 14.2711C7.58102 14.1759 7.59209 14.0425 7.62528 13.9473L8.27811 11.176H5.06929L4.36114 14.2044C4.22836 14.7853 3.85215 15.0615 3.22145 15.0615C2.62395 15.0615 2.24774 14.7663 2.24774 14.2711C2.24774 14.1759 2.25881 14.0425 2.292 13.9473L2.93377 11.176ZM5.35698 9.4904H8.7539L9.50632 6.35723H6.09833L5.35698 9.4904Z"
                    fill="black"
                  />
                </svg>
                Batch ID
              </div>
            </th>
            <th className="text-base font-medium text-left border-b-2 py-3">
              <div className="flex flex-row items-center justify-center gap-1.5">
                <svg
                  className="pt-0.5"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.77959 12.018C1.46233 11.8497 1.21971 11.6554 1.05175 11.4352C0.883786 11.2151 0.799805 10.874 0.799805 10.4121V5.28353C0.799805 4.94681 0.867456 4.66836 1.00276 4.44819C1.14273 4.22371 1.36201 4.03376 1.66061 3.87835L6.60852 1.2752C7.0331 1.05072 7.453 0.938477 7.86825 0.938477C8.28349 0.938477 8.70106 1.05072 9.12097 1.2752L14.0759 3.87835C14.3698 4.03376 14.5844 4.22371 14.7197 4.44819C14.8597 4.66836 14.9297 4.94681 14.9297 5.28353V10.4121C14.9297 10.874 14.8457 11.2151 14.6777 11.4352C14.5144 11.6554 14.2718 11.8497 13.9499 12.018L8.44912 14.9061C8.24849 15.0097 8.05254 15.0615 7.86125 15.0615C7.67462 15.0615 7.48333 15.0097 7.28737 14.9061L1.77959 12.018ZM2.40945 11.1633L7.31537 13.747V8.37234L1.86357 5.49075V10.3797C1.86357 10.5567 1.90323 10.7057 1.98254 10.8266C2.06186 10.9474 2.20416 11.0597 2.40945 11.1633ZM13.327 11.1633C13.5277 11.0597 13.6676 10.9474 13.7469 10.8266C13.8263 10.7057 13.8659 10.5567 13.8659 10.3797V5.49075L8.41412 8.37234V13.747L13.327 11.1633ZM7.86825 7.46577L10.0308 6.33256L4.62796 3.48982L2.46544 4.63598L7.86825 7.46577ZM11.1575 5.74329L13.2711 4.63598L8.65907 2.2012C8.13652 1.92059 7.6093 1.92059 7.07742 2.2012L5.73372 2.90703L11.1575 5.74329Z"
                    fill="black"
                  />
                </svg>
                Airway Bill
              </div>
            </th>
            <th className="text-base font-medium text-left border-b-2 py-3">
              <div className="flex flex-row items-center justify-center gap-1.5">
                <svg
                  className="pt-0.5"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.481 15.0615C1.73001 15.0615 1.16212 14.8522 0.777351 14.4337C0.392581 14.0201 0.200195 13.4099 0.200195 12.603V3.39696C0.200195 2.58503 0.392581 1.9723 0.777351 1.55877C1.16212 1.14524 1.73001 0.938477 2.481 0.938477H12.0493C12.8049 0.938477 13.3728 1.14524 13.7529 1.55877C14.1377 1.9723 14.3301 2.58503 14.3301 3.39696V12.603C14.3301 13.4099 14.1377 14.0201 13.7529 14.4337C13.3728 14.8522 12.8049 15.0615 12.0493 15.0615H2.481ZM2.4671 13.5713H12.0562C12.3483 13.5713 12.5708 13.4906 12.7238 13.3292C12.8814 13.1628 12.9602 12.9157 12.9602 12.5879V5.59825C12.9602 5.27045 12.8814 5.02334 12.7238 4.85692C12.5708 4.6905 12.3483 4.60729 12.0562 4.60729H2.4671C2.17504 4.60729 1.95252 4.6905 1.79954 4.85692C1.64656 5.02334 1.57007 5.27045 1.57007 5.59825V12.5879C1.57007 12.9157 1.64656 13.1628 1.79954 13.3292C1.95252 13.4906 2.17504 13.5713 2.4671 13.5713ZM5.93003 7.23976C5.80486 7.23976 5.71678 7.21455 5.66579 7.16412C5.61943 7.10864 5.59625 7.01535 5.59625 6.88423V6.43792C5.59625 6.30175 5.61943 6.21098 5.66579 6.16559C5.71678 6.11516 5.80486 6.08995 5.93003 6.08995H6.3403C6.46083 6.08995 6.54659 6.11516 6.59758 6.16559C6.64858 6.21098 6.67407 6.30175 6.67407 6.43792V6.88423C6.67407 7.01535 6.64858 7.10864 6.59758 7.16412C6.54659 7.21455 6.46083 7.23976 6.3403 7.23976H5.93003ZM8.19693 7.23976C8.0764 7.23976 7.99064 7.21455 7.93964 7.16412C7.89329 7.10864 7.87011 7.01535 7.87011 6.88423V6.43792C7.87011 6.30175 7.89329 6.21098 7.93964 6.16559C7.99064 6.11516 8.0764 6.08995 8.19693 6.08995H8.6072C8.737 6.08995 8.82508 6.11516 8.87144 6.16559C8.9178 6.21098 8.94097 6.30175 8.94097 6.43792V6.88423C8.94097 7.01535 8.9178 7.10864 8.87144 7.16412C8.82508 7.21455 8.737 7.23976 8.6072 7.23976H8.19693ZM10.4777 7.23976C10.3526 7.23976 10.2645 7.21455 10.2135 7.16412C10.1671 7.10864 10.144 7.01535 10.144 6.88423V6.43792C10.144 6.30175 10.1671 6.21098 10.2135 6.16559C10.2645 6.11516 10.3526 6.08995 10.4777 6.08995H10.8811C11.0109 6.08995 11.0989 6.11516 11.1453 6.16559C11.1916 6.21098 11.2148 6.30175 11.2148 6.43792V6.88423C11.2148 7.01535 11.1916 7.10864 11.1453 7.16412C11.0989 7.21455 11.0109 7.23976 10.8811 7.23976H10.4777ZM3.65618 9.66799C3.53101 9.66799 3.44293 9.64277 3.39194 9.59234C3.34558 9.54191 3.3224 9.45114 3.3224 9.32002V8.87371C3.3224 8.73755 3.34558 8.64425 3.39194 8.59382C3.44293 8.54339 3.53101 8.51817 3.65618 8.51817H4.06644C4.18697 8.51817 4.27042 8.54339 4.31678 8.59382C4.36777 8.64425 4.39327 8.73755 4.39327 8.87371V9.32002C4.39327 9.45114 4.36777 9.54191 4.31678 9.59234C4.27042 9.64277 4.18697 9.66799 4.06644 9.66799H3.65618ZM5.93003 9.66799C5.80486 9.66799 5.71678 9.64277 5.66579 9.59234C5.61943 9.54191 5.59625 9.45114 5.59625 9.32002V8.87371C5.59625 8.73755 5.61943 8.64425 5.66579 8.59382C5.71678 8.54339 5.80486 8.51817 5.93003 8.51817H6.3403C6.46083 8.51817 6.54659 8.54339 6.59758 8.59382C6.64858 8.64425 6.67407 8.73755 6.67407 8.87371V9.32002C6.67407 9.45114 6.64858 9.54191 6.59758 9.59234C6.54659 9.64277 6.46083 9.66799 6.3403 9.66799H5.93003ZM8.19693 9.66799C8.0764 9.66799 7.99064 9.64277 7.93964 9.59234C7.89329 9.54191 7.87011 9.45114 7.87011 9.32002V8.87371C7.87011 8.73755 7.89329 8.64425 7.93964 8.59382C7.99064 8.54339 8.0764 8.51817 8.19693 8.51817H8.6072C8.737 8.51817 8.82508 8.54339 8.87144 8.59382C8.9178 8.64425 8.94097 8.73755 8.94097 8.87371V9.32002C8.94097 9.45114 8.9178 9.54191 8.87144 9.59234C8.82508 9.64277 8.737 9.66799 8.6072 9.66799H8.19693ZM10.4777 9.66799C10.3526 9.66799 10.2645 9.64277 10.2135 9.59234C10.1671 9.54191 10.144 9.45114 10.144 9.32002V8.87371C10.144 8.73755 10.1671 8.64425 10.2135 8.59382C10.2645 8.54339 10.3526 8.51817 10.4777 8.51817H10.8811C11.0109 8.51817 11.0989 8.54339 11.1453 8.59382C11.1916 8.64425 11.2148 8.73755 11.2148 8.87371V9.32002C11.2148 9.45114 11.1916 9.54191 11.1453 9.59234C11.0989 9.64277 11.0109 9.66799 10.8811 9.66799H10.4777ZM3.65618 12.1038C3.53101 12.1038 3.44293 12.0811 3.39194 12.0357C3.34558 11.9853 3.3224 11.8894 3.3224 11.7482V11.3095C3.3224 11.1733 3.34558 11.08 3.39194 11.0296C3.44293 10.9792 3.53101 10.954 3.65618 10.954H4.06644C4.18697 10.954 4.27042 10.9792 4.31678 11.0296C4.36777 11.08 4.39327 11.1733 4.39327 11.3095V11.7482C4.39327 11.8894 4.36777 11.9853 4.31678 12.0357C4.27042 12.0811 4.18697 12.1038 4.06644 12.1038H3.65618ZM5.93003 12.1038C5.80486 12.1038 5.71678 12.0811 5.66579 12.0357C5.61943 11.9853 5.59625 11.8894 5.59625 11.7482V11.3095C5.59625 11.1733 5.61943 11.08 5.66579 11.0296C5.71678 10.9792 5.80486 10.954 5.93003 10.954H6.3403C6.46083 10.954 6.54659 10.9792 6.59758 11.0296C6.64858 11.08 6.67407 11.1733 6.67407 11.3095V11.7482C6.67407 11.8894 6.64858 11.9853 6.59758 12.0357C6.54659 12.0811 6.46083 12.1038 6.3403 12.1038H5.93003ZM8.19693 12.1038C8.0764 12.1038 7.99064 12.0811 7.93964 12.0357C7.89329 11.9853 7.87011 11.8894 7.87011 11.7482V11.3095C7.87011 11.1733 7.89329 11.08 7.93964 11.0296C7.99064 10.9792 8.0764 10.954 8.19693 10.954H8.6072C8.737 10.954 8.82508 10.9792 8.87144 11.0296C8.9178 11.08 8.94097 11.1733 8.94097 11.3095V11.7482C8.94097 11.8894 8.9178 11.9853 8.87144 12.0357C8.82508 12.0811 8.737 12.1038 8.6072 12.1038H8.19693Z"
                    fill="black"
                  />
                </svg>
                Dried Date
              </div>
            </th>
            <th className="text-base font-medium text-left border-b-2 py-3">
              <div className="flex flex-row items-center justify-center gap-1.5">
                <svg
                  className="pt-0.5"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.481 15.0615C1.73001 15.0615 1.16212 14.8522 0.777351 14.4337C0.392581 14.0201 0.200195 13.4099 0.200195 12.603V3.39696C0.200195 2.58503 0.392581 1.9723 0.777351 1.55877C1.16212 1.14524 1.73001 0.938477 2.481 0.938477H12.0493C12.8049 0.938477 13.3728 1.14524 13.7529 1.55877C14.1377 1.9723 14.3301 2.58503 14.3301 3.39696V12.603C14.3301 13.4099 14.1377 14.0201 13.7529 14.4337C13.3728 14.8522 12.8049 15.0615 12.0493 15.0615H2.481ZM2.4671 13.5713H12.0562C12.3483 13.5713 12.5708 13.4906 12.7238 13.3292C12.8814 13.1628 12.9602 12.9157 12.9602 12.5879V5.59825C12.9602 5.27045 12.8814 5.02334 12.7238 4.85692C12.5708 4.6905 12.3483 4.60729 12.0562 4.60729H2.4671C2.17504 4.60729 1.95252 4.6905 1.79954 4.85692C1.64656 5.02334 1.57007 5.27045 1.57007 5.59825V12.5879C1.57007 12.9157 1.64656 13.1628 1.79954 13.3292C1.95252 13.4906 2.17504 13.5713 2.4671 13.5713ZM5.93003 7.23976C5.80486 7.23976 5.71678 7.21455 5.66579 7.16412C5.61943 7.10864 5.59625 7.01535 5.59625 6.88423V6.43792C5.59625 6.30175 5.61943 6.21098 5.66579 6.16559C5.71678 6.11516 5.80486 6.08995 5.93003 6.08995H6.3403C6.46083 6.08995 6.54659 6.11516 6.59758 6.16559C6.64858 6.21098 6.67407 6.30175 6.67407 6.43792V6.88423C6.67407 7.01535 6.64858 7.10864 6.59758 7.16412C6.54659 7.21455 6.46083 7.23976 6.3403 7.23976H5.93003ZM8.19693 7.23976C8.0764 7.23976 7.99064 7.21455 7.93964 7.16412C7.89329 7.10864 7.87011 7.01535 7.87011 6.88423V6.43792C7.87011 6.30175 7.89329 6.21098 7.93964 6.16559C7.99064 6.11516 8.0764 6.08995 8.19693 6.08995H8.6072C8.737 6.08995 8.82508 6.11516 8.87144 6.16559C8.9178 6.21098 8.94097 6.30175 8.94097 6.43792V6.88423C8.94097 7.01535 8.9178 7.10864 8.87144 7.16412C8.82508 7.21455 8.737 7.23976 8.6072 7.23976H8.19693ZM10.4777 7.23976C10.3526 7.23976 10.2645 7.21455 10.2135 7.16412C10.1671 7.10864 10.144 7.01535 10.144 6.88423V6.43792C10.144 6.30175 10.1671 6.21098 10.2135 6.16559C10.2645 6.11516 10.3526 6.08995 10.4777 6.08995H10.8811C11.0109 6.08995 11.0989 6.11516 11.1453 6.16559C11.1916 6.21098 11.2148 6.30175 11.2148 6.43792V6.88423C11.2148 7.01535 11.1916 7.10864 11.1453 7.16412C11.0989 7.21455 11.0109 7.23976 10.8811 7.23976H10.4777ZM3.65618 9.66799C3.53101 9.66799 3.44293 9.64277 3.39194 9.59234C3.34558 9.54191 3.3224 9.45114 3.3224 9.32002V8.87371C3.3224 8.73755 3.34558 8.64425 3.39194 8.59382C3.44293 8.54339 3.53101 8.51817 3.65618 8.51817H4.06644C4.18697 8.51817 4.27042 8.54339 4.31678 8.59382C4.36777 8.64425 4.39327 8.73755 4.39327 8.87371V9.32002C4.39327 9.45114 4.36777 9.54191 4.31678 9.59234C4.27042 9.64277 4.18697 9.66799 4.06644 9.66799H3.65618ZM5.93003 9.66799C5.80486 9.66799 5.71678 9.64277 5.66579 9.59234C5.61943 9.54191 5.59625 9.45114 5.59625 9.32002V8.87371C5.59625 8.73755 5.61943 8.64425 5.66579 8.59382C5.71678 8.54339 5.80486 8.51817 5.93003 8.51817H6.3403C6.46083 8.51817 6.54659 8.54339 6.59758 8.59382C6.64858 8.64425 6.67407 8.73755 6.67407 8.87371V9.32002C6.67407 9.45114 6.64858 9.54191 6.59758 9.59234C6.54659 9.64277 6.46083 9.66799 6.3403 9.66799H5.93003ZM8.19693 9.66799C8.0764 9.66799 7.99064 9.64277 7.93964 9.59234C7.89329 9.54191 7.87011 9.45114 7.87011 9.32002V8.87371C7.87011 8.73755 7.89329 8.64425 7.93964 8.59382C7.99064 8.54339 8.0764 8.51817 8.19693 8.51817H8.6072C8.737 8.51817 8.82508 8.54339 8.87144 8.59382C8.9178 8.64425 8.94097 8.73755 8.94097 8.87371V9.32002C8.94097 9.45114 8.9178 9.54191 8.87144 9.59234C8.82508 9.64277 8.737 9.66799 8.6072 9.66799H8.19693ZM10.4777 9.66799C10.3526 9.66799 10.2645 9.64277 10.2135 9.59234C10.1671 9.54191 10.144 9.45114 10.144 9.32002V8.87371C10.144 8.73755 10.1671 8.64425 10.2135 8.59382C10.2645 8.54339 10.3526 8.51817 10.4777 8.51817H10.8811C11.0109 8.51817 11.0989 8.54339 11.1453 8.59382C11.1916 8.64425 11.2148 8.73755 11.2148 8.87371V9.32002C11.2148 9.45114 11.1916 9.54191 11.1453 9.59234C11.0989 9.64277 11.0109 9.66799 10.8811 9.66799H10.4777ZM3.65618 12.1038C3.53101 12.1038 3.44293 12.0811 3.39194 12.0357C3.34558 11.9853 3.3224 11.8894 3.3224 11.7482V11.3095C3.3224 11.1733 3.34558 11.08 3.39194 11.0296C3.44293 10.9792 3.53101 10.954 3.65618 10.954H4.06644C4.18697 10.954 4.27042 10.9792 4.31678 11.0296C4.36777 11.08 4.39327 11.1733 4.39327 11.3095V11.7482C4.39327 11.8894 4.36777 11.9853 4.31678 12.0357C4.27042 12.0811 4.18697 12.1038 4.06644 12.1038H3.65618ZM5.93003 12.1038C5.80486 12.1038 5.71678 12.0811 5.66579 12.0357C5.61943 11.9853 5.59625 11.8894 5.59625 11.7482V11.3095C5.59625 11.1733 5.61943 11.08 5.66579 11.0296C5.71678 10.9792 5.80486 10.954 5.93003 10.954H6.3403C6.46083 10.954 6.54659 10.9792 6.59758 11.0296C6.64858 11.08 6.67407 11.1733 6.67407 11.3095V11.7482C6.67407 11.8894 6.64858 11.9853 6.59758 12.0357C6.54659 12.0811 6.46083 12.1038 6.3403 12.1038H5.93003ZM8.19693 12.1038C8.0764 12.1038 7.99064 12.0811 7.93964 12.0357C7.89329 11.9853 7.87011 11.8894 7.87011 11.7482V11.3095C7.87011 11.1733 7.89329 11.08 7.93964 11.0296C7.99064 10.9792 8.0764 10.954 8.19693 10.954H8.6072C8.737 10.954 8.82508 10.9792 8.87144 11.0296C8.9178 11.08 8.94097 11.1733 8.94097 11.3095V11.7482C8.94097 11.8894 8.9178 11.9853 8.87144 12.0357C8.82508 12.0811 8.737 12.1038 8.6072 12.1038H8.19693Z"
                    fill="black"
                  />
                </svg>
                Floured Date
              </div>
            </th>
            <th className="text-base font-medium text-left border-b-2 py-3">
              <div className="flex flex-row items-center justify-center gap-1.5">
                <svg
                  className="pt-0.5"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.113563 12.7794L1.65033 6.96979C1.786 6.45685 2.04563 6.06129 2.42924 5.78309C2.81285 5.50054 3.29002 5.35926 3.86075 5.35926H10.2675C10.8382 5.35926 11.3154 5.50054 11.699 5.78309C12.0826 6.06129 12.3422 6.45685 12.4779 6.96979L14.0217 12.7794C14.2135 13.501 14.1503 14.0617 13.8322 14.4617C13.5188 14.8616 12.9878 15.0615 12.2393 15.0615H1.89593C1.14275 15.0615 0.607106 14.8616 0.288993 14.4617C-0.0244422 14.0617 -0.0829189 13.501 0.113563 12.7794ZM1.45385 12.8642C1.36496 13.1641 1.379 13.3923 1.49595 13.5488C1.61758 13.7053 1.8164 13.7835 2.09241 13.7835H12.0288C12.3141 13.7835 12.513 13.7053 12.6252 13.5488C12.7422 13.3923 12.7586 13.1641 12.6744 12.8642L11.1797 7.37405C11.044 6.88285 10.7212 6.63725 10.2113 6.63725H3.91689C3.40697 6.63725 3.08652 6.88285 2.95553 7.37405L1.45385 12.8642ZM6.37291 6.31775V4.23125H7.7553V6.31775H6.37291ZM7.06761 4.86372C6.67933 4.86372 6.32379 4.77678 6.001 4.60291C5.68288 4.42468 5.42793 4.18778 5.23612 3.89219C5.04432 3.5966 4.94842 3.26841 4.94842 2.90762C4.94842 2.55117 5.04432 2.22298 5.23612 1.92305C5.42793 1.62311 5.68288 1.38403 6.001 1.20581C6.32379 1.02759 6.67933 0.938477 7.06761 0.938477C7.44654 0.938477 7.79506 1.02759 8.11318 1.20581C8.43597 1.38403 8.69561 1.62311 8.89209 1.92305C9.08857 2.22298 9.18681 2.55117 9.18681 2.90762C9.18681 3.26841 9.08857 3.5966 8.89209 3.89219C8.70028 4.18778 8.44299 4.42468 8.12019 4.60291C7.80208 4.77678 7.45122 4.86372 7.06761 4.86372ZM7.06761 3.79438C7.32959 3.79438 7.55414 3.70745 7.74127 3.53357C7.92839 3.35535 8.02195 3.1467 8.02195 2.90762C8.02195 2.66854 7.92605 2.45989 7.73425 2.28167C7.54712 2.10344 7.32491 2.01433 7.06761 2.01433C6.80564 2.01433 6.57875 2.10344 6.38694 2.28167C6.19982 2.45989 6.10626 2.66854 6.10626 2.90762C6.10626 3.1467 6.19982 3.35535 6.38694 3.53357C6.57875 3.70745 6.80564 3.79438 7.06761 3.79438Z"
                    fill="black"
                  />
                </svg>
                Weight
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {data.map((row, index) => (
            <tr
              key={row.id}
              className={` ${
                index === data.length - 1 ? "border-b-0" : "border-b-2"
              }`}
            >
              <td
                className={`font-semibold text-[#a7ad6f] text-base text-center ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                } py-4`}
              >
                {row.batchId}
              </td>
              <td
                className={`font-semibold text-black text-base text-center ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                } py-4`}
              >
                {row.shipmentId}
              </td>
              <td
                className={`font-medium text-sm text-[#828282] text-center ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                } py-4`}
              >
                {row.driedDate}
              </td>
              <td
                className={`font-medium text-sm text-[#828282] text-center ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                } py-4`}
              >
                {row.flouredDate}
              </td>
              <td
                className={`font-semibold text-black text-base text-center ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                } py-4`}
              >
                {row.weight}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
