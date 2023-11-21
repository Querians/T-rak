import Container from '@/app/components/container';

export default function Spawner(props) {
  const { items, handleRemoveElement } = props;
  return (
    <div
      className={`transition ${
        !props.isEditable && 'translate-y-full opacity-0'
      } fixed inset-x-0 bottom-0 z-10 h-[152px] w-full rounded-[10px] bg-cherry`}
    >
      <Container
        isEditable={true}
        rowIndex={items.length - 1}
        onRemove={handleRemoveElement}
        id={items[items.length - 1].id}
        items={items[items.length - 1].elements}
        className={`flex h-full w-full shrink-0 gap-x-[15px] px-5 py-4 `}
        itemClassName={`relative min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px] rounded-xl shadow-lg`}
      />
    </div>
  );
}
